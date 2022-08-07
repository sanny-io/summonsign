import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'
import dutiesSlice from './duties'
import settingsSlice from './settings'

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    settings: settingsSlice.reducer,
    duties: dutiesSlice.reducer,
  }
})