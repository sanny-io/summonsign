import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import firebase from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import nookies from 'nookies'
import Loading from '../components/Loading'

export default function Auth() {
  const router = useRouter()
  const [user] = useAuthState(firebase.auth())
  const { code: redditAccessToken } = router.query

  useEffect(() => {
    (async () => {
      if (user) {
        nookies.set(
          undefined,
          'token',
          await user.getIdToken() || '',
          { path: '/', expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 365 * 10)) }
        )

        router.push('/')
      }
    })()
  }, [user])

  useEffect(() => {
    (async () => {
      if (redditAccessToken) {
        const loginResponse = await fetch('/api/auth', { method: 'POST', body: JSON.stringify({ redditAccessToken }) })
        const { customToken } = await loginResponse.json()

        await firebase.auth().signInWithCustomToken(customToken)
      }
    })()
  }, [redditAccessToken])

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <Loading className="w-32 h-32" />
    </div>
  )
}