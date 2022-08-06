import type { Settings } from '../../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
})

export default settingsSlice
export const { updateSettings } = settingsSlice.actions