import { setDoc, doc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../store/auth'
import { updateSettings as updateSettingsInternal } from '../store/auth'
import type { AppDispatch, RootState, Settings } from '../types'
import useAuth from './useAuth'
import { firestore } from '../firebase'
import { useCallback, useMemo } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function useSettings() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, settings } = useAuth()
  const debouncedUpdateSettings = useDebouncedCallback(useCallback(() => {
    localStorage.setItem('settings', JSON.stringify(settings))

    if (user) {
      setDoc(
        doc(firestore, `settings/${user.id}`),
        settings,
        {
          merge: true,
        },
      )
    }
  }, [settings, user]), 5000)

  const updateSettings = (settings: Partial<Settings>) => {
    dispatch(updateSettingsInternal(settings))
    debouncedUpdateSettings()
  }

  return {
    settings: useMemo(() => settings, [settings]),
    updateSettings: useCallback(updateSettings, []),
  }
}