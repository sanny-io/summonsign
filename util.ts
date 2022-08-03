import { Route } from './types'
import snoowrap from 'snoowrap'

export const getLoginUrl = () => {
  return `https://reddit.com/api/v1/authorize?client_id=${process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID}&scope=identity,flair&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}${Route.AuthPage}&response_type=code&state=0&duration=permanent`
}

export const getRedditInstance = (redditRefreshToken: string): snoowrap => {
  return new snoowrap({
    refreshToken: redditRefreshToken,
    userAgent: 'Summon Sign',
    clientId: process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID,
    clientSecret: '',
  })
}