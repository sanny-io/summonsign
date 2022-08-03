import type { NextApiRequest, NextApiResponse } from 'next'
import admin from '../../../firebase.admin'

type Response = {
  customToken: string,
}

export default async (request: NextApiRequest, response: NextApiResponse<Response>) => {
  return (
    response.json({
      customToken: await admin.auth().createCustomToken('test')
    })
  )
}