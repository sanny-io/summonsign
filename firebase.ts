import { initializeApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth } from 'firebase/auth'

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

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(firestore, 'localhost', 8080)
}

export default app
export { auth, firestore }