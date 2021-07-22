import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import firebase from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Spinner from '../components/Spinner'

export default function Auth() {
  const router = useRouter()
  const [user] = useAuthState(firebase.auth())
  const { code: redditAccessToken } = router.query

  useEffect(() => {
    (async () => {
      if (user) {
        await fetch(
          '/api/auth/session',
          {
            method: 'POST',
            body: JSON.stringify(
              {
                idToken: await user.getIdToken()
              }
            )
          }
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
      <Spinner className="w-32 h-32" />
    </div>
  )
}