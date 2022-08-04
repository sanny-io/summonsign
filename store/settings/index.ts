import type { Duty, Settings } from '../../types'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { firestore } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { setUser } from '../auth'

type SettingsState = {
  settings: Settings,
}

const initialState: SettingsState = {
  settings: {
    bossFilter: 'include',
    bosses: [],
    updateInterval: 10,
    hideFulfilledDuties: false,
    shouldNotify: false,
    playNotificationSound: false,
    platforms: ['pc', 'xbox', 'ps4', 'ps5', 'switch'],
  }
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings(state, action: PayloadAction<Partial<Settings>>) {
      state.settings = {
        ...state.settings,
        ...action.payload,
      }
    }
  },

  extraReducers: builder => {
    builder.addCase(setUser, (state, action) => {
      if (action.payload) {
        state.settings = action.payload.settings
      }
    })
  },
})

export default settingsSlice
export const { updateSettings } = settingsSlice.actions