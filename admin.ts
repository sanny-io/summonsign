import admin from 'firebase-admin'

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
      projectId: process.env.GOOGLE_PROJECT_ID,
    }),

    databaseURL: 'https://summonsign-9d5f8-default-rtdb.firebaseio.com'
  })
}

export default admin