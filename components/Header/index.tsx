import { Button } from '@mantine/core'
import Image from 'next/image'
import React, { memo } from 'react'
import useAuth from '../../hooks/useAuth'
import Logo from '../../public/images/logo.png'

function Header() {
  const { signIn, signOut, user, isAuthenticating, redirectToSignIn } = useAuth()

  console.log({ isAuthenticating })

  return (
    <div className="container flex flex-col py-16 text-center">
      <div className="flex justify-center mb-4">
        <Image
          src={Logo}
          layout='intrinsic'
        />
      </div>

      <h1 className="mb-6">
        Be summoned to another world.
      </h1>

      <ol className="flex justify-center space-x-2">
        <li>
          {
            user
              ? <Button variant="subtle" onClick={signOut}>
                Sign out
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