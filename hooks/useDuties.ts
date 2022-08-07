import { setDoc, doc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../store/auth'
import { updateSettings as updateSettingsInternal } from '../store/settings'
import type { AppDispatch, RootState, Settings } from '../types'
import useAuth from './useAuth'
import { firestore } from '../firebase'
import { useCallback, useMemo } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import useSettings from './useSettings'
import { refreshDuties } from '../store/duties'

export default function useDuties() {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useAuth()
  const { duties, filteredDuties } = useSelector((state: RootState) => state.duties)
  const { settings } = useSettings()

  return {
    duties,
    filteredDuties,
    refreshDuties: async () => await dispatch(refreshDuties(settings)).unwrap(),
  }
}