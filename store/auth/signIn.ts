import { createAsyncThunk } from '@reduxjs/toolkit'
import { Route } from '../../types'
import { getAuth } from 'firebase/auth'

export default createAsyncThunk('auth/signIn', async () => {
  return Promise.resolve(1)
  // return await fetch(
  //   Route.AuthCreateSession,
  //   {
  //     method: 'POST',
  //     body: JSON.stringify(
  //       {
  //         // idToken: await user.getIdToken()
  //         idToken: 'whatever',
  //       }
  //     )
  //   }
  // )
})