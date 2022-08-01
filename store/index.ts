import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'
import dutiesSlice from './duties'

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    duties: dutiesSlice.reducer,
  }
})