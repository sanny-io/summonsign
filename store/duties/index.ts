import type { Duty, Settings } from '../../types'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { firestore } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'

type DutiesState = {
  settings: Settings,
  duties: Duty[],
}

type SettingUpdate = {
  setting: keyof Settings,
  value: any,
}

const initialState: DutiesState = {
  settings: {
    bossFilter: 'include',
    bosses: [],
    updateInterval: 10,
    hideFulfilledDuties: false,
    shouldNotify: false,
    playNotificationSound: false,
    platforms: ['pc', 'xbox', 'ps4', 'ps5', 'switch'],
  },

  duties: [],
}

const dutiesSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSetting(state, action: PayloadAction<SettingUpdate>) {
      // @ts-ignore
      state.settings[action.payload.setting] = action.payload.value
    }
  },
})

export default dutiesSlice
export const { updateSetting } = dutiesSlice.actions