import type { User } from '../../types'

import { createSlice } from '@reduxjs/toolkit'
import signIn from './signIn'
import signOut from './signOut'
import { getLoginUrl } from '../../util'

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
  reducers: {
    redirectToSignIn() {
      window.location.href = getLoginUrl()
    }
  },

  extraReducers: builder => {
    builder.addCase(signIn.pending, state => {
      state.isAuthenticating = true
    })

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuthenticating = false
    })

    builder.addCase(signIn.rejected, state => {
      state.isAuthenticating = false
    })

    builder.addCase(signOut.fulfilled, state => {
      state.user = null
    })
  },
})

export default authSlice
export { signIn, signOut }
export const { redirectToSignIn } = authSlice.actions