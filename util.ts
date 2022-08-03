import { Route } from './types'

export function getLoginUrl() {
  return `https://reddit.com/api/v1/authorize?client_id=${process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID}&scope=identity,flair&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}${Route.AuthPage}&response_type=code&state=0&duration=permanent`
}