import type { Settings } from '../../types'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setUser } from '../auth'

const storedSettings = typeof document !== 'undefined' && localStorage.getItem('settings')

type SettingsState = {
  settings: Settings,
}

const initialState: SettingsState = {
  settings: storedSettings && JSON.parse(storedSettings) || {
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
    updateSettings(state, { payload: settings }: PayloadAction<Partial<Settings>>) {
      state.settings = {
        ...state.settings,
        ...settings,
      }
    }
  },

  extraReducers: builder => {
    builder.addCase(setUser, (state, { payload: user }) => {
      if (user) {
        state.settings = {
          ...state.settings,
          ...user.settings,
        }
      }
    })
  },
})

export default settingsSlice
export const { updateSettings } = settingsSlice.actions