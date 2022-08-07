import { Platform, Route } from './types'
import snoowrap from 'snoowrap'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const getLoginUrl = () => {
  return `https://reddit.com/api/v1/authorize?client_id=${process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID}&scope=identity,flair&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}${Route.AuthPage}&response_type=code&state=0&duration=permanent`
}

export const determinePlatform = (title: string): Platform => {
  title = title.toLowerCase()

  if (title.includes('ps4')) {
    return 'ps4'
  }

  if (title.includes('ps5')) {
    return 'ps5'
  }

  if (title.match(/xb[xo1]/)) {
    return 'xbox'
  }

  if (title.includes('switch')) {
    return 'switch'
  }

  return 'pc'
}


export const getRedditInstance = (redditRefreshToken: string): snoowrap => {
  return new snoowrap({
    refreshToken: redditRefreshToken,
    userAgent: 'Summon Sign',
    clientId: process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID,
    clientSecret: '',
  })
}

export { dayjs }