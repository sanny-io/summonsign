import { useDispatch, useSelector } from 'react-redux'
import { redirectToSignIn, signIn, signOut } from '../store/auth'
import type { AppDispatch, RootState } from '../types'

export default function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const auth = useSelector((state: RootState) => state.auth)
  // const auth = useSelector((state: RootState) => state.auth, (a, b) => {
  //   return (
  //     a.isAuthenticating !== b.isAuthenticating ||
  //     a.user?.id !== b.user?.id
  //   )
  // })

  return {
    ...auth,
    signIn: async () => await dispatch(signIn()).unwrap(),
    signOut: async () => await dispatch(signOut()).unwrap(),
    redirectToSignIn: () => dispatch(redirectToSignIn()),
  }
}