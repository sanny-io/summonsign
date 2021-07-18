import { createContext } from 'react'
import { SettingsProps } from './components/Settings'

export type SettingsContextProps = {
  settings: SettingsProps,
  updateSetting(): void,
}

// @ts-ignore
const SettingsContext = createContext<SettingsProps>()

export { SettingsContext }