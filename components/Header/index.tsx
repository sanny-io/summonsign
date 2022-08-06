import { Button, Indicator } from '@mantine/core'
import Image from 'next/image'
import React, { memo } from 'react'
import useAuth from '../../hooks/useAuth'
import Logo from '../../public/images/logo.png'
import Spinner from '../Spinner'

function Header() {
  const { signOut, user, isAuthenticating, redirectToSignIn } = useAuth()

  return (
    <div className="container flex flex-col py-16 text-center">
      <div className="flex justify-center mb-4">
        <Image
          src={Logo}
          layout="intrinsic"
        />
      </div>

      <ol className="flex justify-center space-x-2">
        <li>
          {
            isAuthenticating
              ? <Spinner />
              : user
                ? <Button variant="light" onClick={signOut}>
                  {user.id}
                </Button>
                : <Button onClick={redirectToSignIn}>
                  Sign in using reddit
                </Button>
          }
        </li>
      </ol>
    </div>
  )
}

export default memo(Header)