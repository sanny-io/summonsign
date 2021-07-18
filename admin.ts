import admin from 'firebase-admin'
import serviceAccountKey from './serviceAccountKey.json'

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: serviceAccountKey.private_key,
      clientEmail: serviceAccountKey.client_email,
      projectId: serviceAccountKey.project_id,
    }),

    databaseURL: 'https://summonsign-9d5f8-default-rtdb.firebaseio.com'
  })
}

export default admin