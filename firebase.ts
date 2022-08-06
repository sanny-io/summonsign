import { initializeApp } from 'firebase/app'
import { connectFirestoreEmulator, doc, getDoc, getFirestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth, onAuthStateChanged } from 'firebase/auth'
import store from './store'
import { setUser, signOut } from './store/auth'
import { Settings, User } from './types'
import { setSettings } from './store/settings'

const app = initializeApp({
  apiKey: 'AIzaSyB1Gl7_Bac0_k8Rgh0xgoqiBZ02yS5R138',
  authDomain: 'summonsign-9d5f8.firebaseapp.com',
  projectId: 'summonsign-9d5f8',
  storageBucket: 'summonsign-9d5f8.appspot.com',
  messagingSenderId: '765639272284',
  appId: '1:765639272284:web:9f73028384877ff99c8399',
  measurementId: 'G-XTHE67GPD2'
})

const auth = getAuth(app)
const firestore = getFirestore(app)

// @ts-ignore
if (process.env.NODE_ENV === 'development' && !global.emulatorsRunning) {
  connectAuthEmulator(auth, 'http://localhost:9099', {
    disableWarnings: true,
  })

  connectFirestoreEmulator(firestore, 'localhost', 8080)

  // @ts-ignore
  global.emulatorsRunning = true
}

if (typeof document !== 'undefined') {
  onAuthStateChanged(auth, async user => {
    if (user) {
      const settings = (await (
        getDoc(
          doc(firestore, `settings/${user.uid}`)
        )
      )).data() as Settings | null

      store.dispatch(setUser({
        id: user.uid,
      } as User))

      if (settings) {
        store.dispatch(setSettings(settings))
      }
    }
    else {
      store.dispatch(setUser(null))
    }
  })
}

export default app
export { auth, firestore }