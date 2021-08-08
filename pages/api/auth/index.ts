import type { NextApiRequest, NextApiResponse } from 'next'
import base64 from 'base-64'
import snoowrap from 'snoowrap'
import admin from '../../../admin'
import FormData from 'form-data'
import { getRedditInstance } from '../../../util'
import { Route } from '../../../types'

type AuthProps = {
  customToken: string,
}

export default async (request: NextApiRequest, response: NextApiResponse<AuthProps>) => {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }

  const headers = new Headers()
  const formData = new FormData()
  const { redditAccessToken } = JSON.parse(request.body)

  formData.append('grant_type', 'authorization_code')
  formData.append('code', redditAccessToken)
  formData.append('redirect_uri', `${process.env.NEXT_PUBLIC_BASE_URL}${Route.AuthPage}`)

  headers.append('Authorization', 'Basic ' + base64.encode(`${process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID}:`))

  const redditResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: headers,
    // @ts-ignore https://github.com/Microsoft/TypeScript/issues/14537
    body: formData,
  })

  const json = await redditResponse.json()
  const { refresh_token: redditRefreshToken } = json

  const reddit = getRedditInstance(redditRefreshToken)

  // @ts-ignore
  const redditUser: snoowrap.RedditUser = await reddit.getMe()
  const customToken = await admin.auth().createCustomToken(redditUser.name, { redditRefreshToken })

  console.log(`${redditUser.name} signed in.`)

  response.status(200).json({ customToken })
}