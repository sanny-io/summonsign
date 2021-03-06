import React, { useEffect, useState, useRef } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Duty, { DutyProps } from '../components/Duty'
import Reddit from '../providers/reddit'
import IDutyProvider from '../providers'
import firebase from '../firebase'
import Settings, { SettingsProps } from '../components/Settings'
import { Platform, BossFilter, Setting } from '../types'
import admin from '../admin'
import nookies from 'nookies'
import Footer from '../components/Footer'
import logo from '../public/images/logo.png'
import { SettingsContext } from '../state'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doLogin, getRedditInstance, useWriteBatch } from '../util'
import Spinner from '../components/Spinner'
import bonfire from '../public/images/bonfire.png'

const karmaPattern = /\+(\d+) Karma/

const defaultSettings = {
  bossFilter: BossFilter.Include,
  bosses: [] as string[],
  updateInterval: 10,
  hideFulfilledDuties: false,
  shouldNotify: false,
  playNotificationSound: false,
  platforms: [] as Platform[],
  // platforms: [Platform.PC, Platform.Xbox, Platform.PS4, Platform.PS5, Platform.Switch],
}

const includeBossFilter = (bosses: string[], boss: string) => bosses.includes(boss)
const excludeBossFilter = (bosses: string[], boss: string) => !bosses.includes(boss)

const bossFilters = {
  [BossFilter.Include]: includeBossFilter,
  [BossFilter.Exclude]: excludeBossFilter,
}

export type HomeProps = {
  duties: DutyProps[],
  settings: SettingsProps,
}

export default function Home(props: HomeProps) {
  const [duties, setDuties] = useState<DutyProps[]>(props.duties)
  const [visibleDuties, setVisibleDuties] = useState<DutyProps[]>(props.duties)
  const [settings, setSettings] = useState<SettingsProps>(props.settings)
  const [user, loadingUser] = useAuthState(firebase.auth())
  const batch = useWriteBatch(firebase.firestore(), 5000)
  const echoSound = useRef<HTMLAudioElement>(null)
  const reddit = new Reddit()
  const seenDuties = useRef<Record<string, boolean>>({})

  const handleSignOutClick = () => {
    firebase.auth().signOut()
  }

  const updateSetting = async (setting: Setting, value: any) => {
    const newSettings = { ...settings, [setting]: value }

    setSettings(newSettings)

    if (user) {
      batch.set(firebase.firestore().doc(`settings/${user.uid}`), newSettings, { merge: true })
    }
  }

  useEffect(() => {
    const newDuties = [] as DutyProps[]

    visibleDuties.forEach(duty => {
      if (!seenDuties.current[duty.id]) {
        seenDuties.current[duty.id] = true
        newDuties.push(duty)
      }
    })

    // If there's 25 new duties, it's probably our first render.
    if (newDuties.length > 0 && newDuties.length < 25) {
      if (settings.shouldNotify) {
        const firstUnseenDuty = newDuties[newDuties.length - 1]
        const notification = new Notification(firstUnseenDuty.title, { body: firstUnseenDuty.content })

        notification.onclick = () => window.open(firstUnseenDuty.url)

        if (settings.playNotificationSound) {
          echoSound.current?.play()
        }
      }
    }
  }, [visibleDuties])

  useEffect(() => {
    let newVisibleDuties = [...duties]

    if (settings.hideFulfilledDuties) {
      newVisibleDuties = newVisibleDuties.filter(duty => !duty.isFulfilled)
    }

    if (settings.bosses.length > 0) {
      newVisibleDuties = newVisibleDuties.filter(duty => duty.boss && settings.bosses.includes(duty.boss))
    }

    if (settings.platforms.length > 0) {
      newVisibleDuties = newVisibleDuties.filter(duty => settings.platforms.includes(duty.platform))
    }

    setVisibleDuties(newVisibleDuties)
  }, [settings.hideFulfilledDuties, settings.bosses, settings.platforms, duties])

  useEffect(() => {
    const dutyRefreshTimer = setInterval(async () => {
      setDuties(await reddit.getDuties())
    }, settings.updateInterval * 1000)

    return () => clearInterval(dutyRefreshTimer)
  }, [settings.updateInterval])

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      <main>
        <div className="container h-full px-4 py-32 mx-auto text-center">
          <Image
            src={logo}
            alt="Summon Sign logo"
            layout="intrinsic"
          />

          <h1 className="mb-8 text-2xl">Be summoned to another world.</h1>

          {
            loadingUser
              ? <Spinner className="w-6 h-6 mx-auto mb-6" /> : user ? <span className="mb-2">Signed in as {user.uid}.</span>
                : <button onClick={doLogin} className="p-2 mb-6 bg-blue-700">Sign in through reddit</button>
          }

          {
            user && <button onClick={handleSignOutClick} className="block p-2 mx-auto mt-2 bg-blue-700">Sign out</button>
          }

          <Settings />

          {
            visibleDuties.length > 0
              ? <ol className="w-full space-y-8 text-left">
                {
                  visibleDuties.map((duty, index) => <li key={index}><Duty {...duty} /></li>)
                }
              </ol>
              : (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="hidden xl:block">
                    <Image
                      src={bonfire}
                    />
                  </div>

                  <span className="mt-4">Rest, Ashen One, for there are no duties matching your criteria.</span>
                </div>
              )
          }
        </div>

        <audio src="/audio/echo.mp3" ref={echoSound} />
      </main>

      <Footer />
    </SettingsContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const provider: IDutyProvider = new Reddit()
  const cookies = nookies.get(context)
  let settings = { ...defaultSettings }

  if (cookies.session) {
    try {
      const decodedToken = await admin.auth().verifySessionCookie(cookies.session)
      const { uid, redditRefreshToken } = decodedToken
      const reddit = getRedditInstance(redditRefreshToken)
      const { flair_text: flair } = await reddit.getSubreddit('summonsign').getMyFlair()

      if (flair) {
        const karmaMatch = flair.match(karmaPattern)

        if (karmaMatch) {
          const karma = Number(karmaMatch[1])

          await admin
            .firestore()
            .doc(`users/${uid}`)
            .set({ karma }, { merge: true })
        }
      }

      const settingsDocument = await admin
        .firestore()
        .doc(`settings/${uid}`)
        .get()

      if (settingsDocument.exists) {
        settings = settingsDocument.data() as SettingsProps
      }
    }

    catch (e) {

    }
  }

  return {
    props: {
      duties: await provider.getDuties(),
      settings,
    }
  }
}