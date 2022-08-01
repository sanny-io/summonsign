import { setDoc, doc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../store/auth'
import { updateSetting as updateSettingInternal } from '../store/duties'
import type { AppDispatch, RootState, Settings } from '../types'
import useAuth from './useAuth'
import { firestore } from '../firebase'
import { useCallback, useMemo } from 'react'

export default function useSettings() {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useAuth()
  const settings = useSelector((state: RootState) => state.duties.settings)

  const updateSetting = (setting: keyof Settings, value: any) => {
    dispatch(updateSettingInternal({
      setting,
      value,
    }))

    // setDoc(
    //   doc(firestore, `users/${user?.id}`),

    //   {
    //     [setting]: value,
    //   },

    //   {
    //     merge: true,
    //   },
    // )
  }

  return {
    settings: useMemo(() => settings, [settings]),
    updateSetting: useCallback(updateSetting, []),
  }
}