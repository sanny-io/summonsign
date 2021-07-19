import { createContext } from 'react'
import { SettingsProps } from './components/Settings'
import { Setting } from './types'

export type SettingsContextProvider = {
  settings: SettingsProps,
  updateSetting(setting: Setting, value: any): void,
}

// @ts-ignore
const SettingsContext = createContext<SettingsContextProvider>()

export { SettingsContext }