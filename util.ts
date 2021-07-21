import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import firebase from './firebase'
// import Bowser from 'bowser'

// const browser = Bowser.getParser(window.navigator.userAgent)

dayjs.extend(relativeTime)

/**
 * Allows for periodically committing all writes as a single atomic unit.
 * It can contain up to 500 operations, with each operation being seperately
 * billed.
 * @param firestore An instance of `Firestore`.
 * @param ms How often to commit changes, in milliseconds.
 * @returns A batch object that will commit changes every `ms` milliseconds.
 */
export function useWriteBatch(firestore: firebase.firestore.Firestore, ms: number): firebase.firestore.WriteBatch {
  const [batch, setBatch] = useState<firebase.firestore.WriteBatch>(firestore.batch())

  useEffect(() => {
    const timer = setInterval(() => {
      batch.commit()
      setBatch(firestore.batch())
    }, ms)

    return () => clearInterval(timer)
  }, [batch])

  return batch
}

export function getLoginUrl() {
  return `https://reddit.com/api/v1/authorize?client_id=${process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID}&scope=identity,flair&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/auth&response_type=code&state=0&duration=permanent`
}

export function doLogin() {
  window.location.href = getLoginUrl()
}

export { dayjs }