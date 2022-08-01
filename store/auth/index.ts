import type { User } from '../../types'

import { createSlice } from '@reduxjs/toolkit'
import signIn from './signIn'

type AuthState = {
  user: User | null,
  isAuthenticating: boolean,
}

const initialState: AuthState = {
  user: null,
  isAuthenticating: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(signIn.pending, state => {
      state.isAuthenticating = true
    })

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload as unknown as User
    })
  },
})

export default authSlice
export { signIn }