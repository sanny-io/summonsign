import { createAsyncThunk } from '@reduxjs/toolkit'
import { setSettings } from '.'
import type { RootState, Settings } from '../../types'

export default createAsyncThunk<void, Partial<Settings>, { state: RootState }>('settings/updateSettings', (settings, store) => {
  const { settings: { settings: existingSettings } } = store.getState()

  store.dispatch(setSettings({
    ...existingSettings,
    ...settings,
  }))
})