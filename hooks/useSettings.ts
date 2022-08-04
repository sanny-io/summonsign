import { setDoc, doc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../store/auth'
import { updateSettings as updateSettingsInternal } from '../store/settings'
import type { AppDispatch, RootState, Settings } from '../types'
import useAuth from './useAuth'
import { firestore } from '../firebase'
import { useCallback, useMemo } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function useSettings() {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useAuth()
  const settings = useSelector((state: RootState) => state.duties.settings)
  const debouncedSetDoc = useDebouncedCallback(useCallback(() => {
    setDoc(
      doc(firestore, `settings/${user?.id}`),
      settings,
      {
        merge: true,
      },
    )
  }, [settings]), 1000)

  const updateSettings = (settings: Partial<Settings>) => {
    dispatch(updateSettingsInternal(settings))
    debouncedSetDoc()
  }

  return {
    settings: useMemo(() => settings, [settings]),
    updateSettings: useCallback(updateSettings, []),
  }
}