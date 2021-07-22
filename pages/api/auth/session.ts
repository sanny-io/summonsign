import type { NextApiRequest, NextApiResponse } from 'next'
import admin from '../../../admin'
import { serialize } from 'cookie'
import { SummonSignApiRequest } from '../../../types'

type SessionProps = {

}

export default async (request: SummonSignApiRequest, response: NextApiResponse<SessionProps>) => {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }

  const { idToken } = JSON.parse(request.body)
  const expiresIn = 604800000

  try {
    const cookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn })

    response.setHeader(
      'Set-Cookie',
      serialize('session', cookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: true,
        path: '/',
      }),
    );

    return response.status(200).end()
  }

  catch (e) {
    console.log('Could not create cookie.')
  }
}