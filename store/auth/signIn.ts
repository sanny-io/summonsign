import { createAsyncThunk } from '@reduxjs/toolkit'
import { Route, User } from '../../types'
import { auth } from '../../firebase'
import { signInWithCustomToken } from 'firebase/auth'
import { getLoginUrl } from '../../util'

export default createAsyncThunk('auth/signIn', async () => {
  const urlSearchParameters = new URLSearchParams(window.location.search)
  const queryParameters = Object.fromEntries(urlSearchParameters.entries())
  const { code: redditAccessToken } = queryParameters

  const loginResponse = await fetch(
    Route.Auth,
    {
      method: 'POST',
      body: JSON.stringify({ redditAccessToken })
    }
  )

  const customToken: string = (await loginResponse.json()).customToken
  const { user } = await signInWithCustomToken(auth, customToken)

  return {
    id: user.uid,
  } as User
})