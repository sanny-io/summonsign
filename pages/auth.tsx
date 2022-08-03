import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Spinner from '../components/Spinner'
import useAuth from '../hooks/useAuth'
import { Route } from '../types'

export default function AuthPage() {
  const router = useRouter()
  const { user, signIn } = useAuth()
  const { customToken, code: redditAccessToken } = router.query

  useEffect(() => {
    console.log({ customToken })
  }, [customToken])

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <Spinner className="w-32 h-32" />
    </div>
  )
}