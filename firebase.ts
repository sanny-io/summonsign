import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: 'AIzaSyB1Gl7_Bac0_k8Rgh0xgoqiBZ02yS5R138',
    authDomain: 'summonsign-9d5f8.firebaseapp.com',
    projectId: 'summonsign-9d5f8',
    storageBucket: 'summonsign-9d5f8.appspot.com',
    messagingSenderId: '765639272284',
    appId: '1:765639272284:web:9f73028384877ff99c8399',
    measurementId: 'G-XTHE67GPD2'
  })

  if (process.env.NODE_ENV === 'development') {
    firebase.auth().useEmulator('http://localhost:9099')
    firebase.firestore().useEmulator('localhost', 8080)
  }

  if (typeof window !== 'undefined') {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  }
}

export default firebase