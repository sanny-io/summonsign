import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { signIn } from '../store/auth'
import type { AppDispatch, RootState } from '../types'

export default function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const auth = useSelector((state: RootState) => state.auth, shallowEqual)

  return {
    ...auth,
    signIn: async () => await dispatch(signIn()).unwrap(),
  }
}