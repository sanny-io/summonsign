import { createAsyncThunk } from '@reduxjs/toolkit'
import { Route, User } from '../../types'
import { auth } from '../../firebase'
import { signInWithCustomToken } from 'firebase/auth'

export default createAsyncThunk('auth/signIn', async (idToken: string) => {
  const response = await fetch(
    Route.AuthCreateSession,
    {
      method: 'POST',
      body: JSON.stringify(
        {
          idToken,
        }
      )
    }
  )

  return JSON.parse(await response.json()) as User
})