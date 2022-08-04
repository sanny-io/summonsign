import type { User } from '../../types'

import { createSlice, createListenerMiddleware, PayloadAction } from '@reduxjs/toolkit'
import signIn from './signIn'
import signOut from './signOut'
import { getLoginUrl } from '../../util'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase'

type AuthState = {
  user: User | null,
  isAuthenticating: boolean,
}

const initialState: AuthState = {
  user: null,
  isAuthenticating: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    redirectToSignIn() {
      window.location.href = getLoginUrl()
    },

    setUser(state, { payload: user }: PayloadAction<User | null>) {
      state.user = user
      state.isAuthenticating = false
    },
  },
})

export default authSlice
export { signIn, signOut }
export const { redirectToSignIn, setUser } = authSlice.actions