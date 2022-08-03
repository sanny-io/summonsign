import type { NextApiRequest, NextApiResponse } from 'next'
import admin from '../../../firebase.admin'
import { Route } from '../../../types'
import { getRedditInstance } from '../../../util'
import snoowrap from 'snoowrap'
import FormData from 'form-data'

type Response = {
  customToken: string,
}

export default async (request: NextApiRequest, response: NextApiResponse<Response>) => {
  const headers = new Headers()
  const formData = new FormData()
  const { redditAccessToken } = JSON.parse(request.body)

  formData.append('grant_type', 'authorization_code')
  formData.append('code', redditAccessToken)
  formData.append('redirect_uri', `${process.env.NEXT_PUBLIC_BASE_URL}${Route.AuthPage}`)

  headers.append('Authorization', 'Basic ' + Buffer.from(`${process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID}:`).toString('base64'))

  const redditResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: headers,
    // @ts-ignore
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