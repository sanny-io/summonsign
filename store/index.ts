import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'
import settingsSlice from './settings'

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    duties: settingsSlice.reducer,
  }
})