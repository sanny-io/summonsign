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
import { SettingsContext } from '../state'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doLogin, useWriteBatch } from '../util'
import Loading from '../components/Loading'

const defaultSettings = {
  bossFilter: BossFilter.Include,
  updateInterval: 10,
  hideFulfilledDuties: false,
  shouldNotify: false,
  playNotificationSound: false,
  platforms: [Platform.PC, Platform.Xbox, Platform.PS4, Platform.PS5, Platform.Switch],
}

export type HomeProps = {
  duties: DutyProps[],
  settings: SettingsProps,
}

export default function Home(props: HomeProps) {
  const [duties, setDuties] = useState<DutyProps[]>(props.duties)
  const [settings, setSettings] = useState<SettingsProps>(props.settings)
  const [user, loadingUser] = useAuthState(firebase.auth())
  const batch = useWriteBatch(firebase.firestore(), 5000)
  const echoSound = useRef<HTMLAudioElement>(null)
  const reddit = new Reddit()

  const updateSetting = async (setting: Setting, value: any) => {
    console.log(`${setting} = ${value}`)
    setSettings({ ...settings, [setting]: value })

    if (user) {
      batch.set(firebase.firestore().doc(`settings/${user.uid}`), { [setting]: value }, { merge: true })
    }
  }

  useEffect(() => {
    (async () => {
      const dutyRefreshTimer = setInterval(async () => {
        setDuties(await reddit.getDuties())
      }, settings.updateInterval * 1000)

      return () => clearInterval(dutyRefreshTimer)
    })()
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      <main>
        <div className="container flex flex-col items-center px-4 py-32 mx-auto">
          <Image src="/images/logo.png" alt="Summon Sign logo" width="620" height="100" />
          <h1 className="mb-8 text-2xl">Be summoned to another world.</h1>

          {
            loadingUser ? <Loading className="mb-6" /> : user ? <span className="mb-6">{user.uid}</span>
              :
              <button onClick={doLogin} className="p-2 mb-6 bg-blue-700">Sign in through reddit</button>
          }

          <Settings />

          <ol className="w-full space-y-8">
            {
              duties.map((duty, index) => <li key={index}><Duty {...duty} /></li>)
            }
          </ol>
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
  let settings = defaultSettings

  if (cookies.token) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(cookies.token)
      const { uid } = decodedToken
      const settingsDocument = await admin
        .firestore()
        .doc(`settings/${uid}`)
        .get()

      settings = { ...settings, ...settingsDocument.data() as SettingsProps }
    }

    catch (e) {
      console.error('Could not verify token.')
    }
  }

  return {
    props: {
      duties: await provider.getDuties(),
      settings,
    }
  }
}