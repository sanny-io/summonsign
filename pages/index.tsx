import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Duty, { DutyProps } from '../components/Duty'
import Reddit from '../providers/reddit'
import IDutyProvider from '../providers'
import firebase from '../firebase'
import Settings, { BossFilter, SettingsProps } from '../components/Settings'
import { Platform } from '../types'
import admin from '../admin'
import nookies from 'nookies'
import { SettingsContext } from '../state'

export type HomeProps = {
  duties: DutyProps[],
  settings: SettingsProps,
}

export default function Home({ duties, settings }: HomeProps) {
  useEffect(() => {
    (async () => {
      const timer = setInterval(() => console.log('hey'), settings.updateInterval * 1000)
      const credentials = await firebase.auth().signInAnonymously()

      nookies.set(
        undefined,
        'token',
        await credentials?.user?.getIdToken() || '',
        { path: '/', expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 365 * 10)) }
      )

      return () => clearInterval(timer)
    })()
  }, [])

  return (
    <SettingsContext.Provider value={settings}>
      <main>
        <div className="container flex flex-col items-center px-4 py-32 mx-auto">
          <Image src="/images/logo.png" alt="Summon Sign logo" width="620" height="100" />
          <h1 className="mb-8 text-2xl">Be summoned to another world.</h1>

          <Settings {...settings} />

          <ol className="w-full space-y-8">
            {
              duties.map((duty, index) => <li key={index}><Duty {...duty} /></li>)
            }
          </ol>
        </div>
      </main>

    </SettingsContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const provider: IDutyProvider = new Reddit()
  const cookies = nookies.get(context)

  let settings = {
    bossFilter: BossFilter.Include,
    updateInterval: 10,
    hideFulfilledDuties: false,
    shouldNotify: false,
    playNotificationSound: false,
    platforms: [Platform.PC, Platform.Xbox, Platform.PS4, Platform.PS5, Platform.Switch],
  }

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