import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from '../../../service-account-key.json'

// const serviceAccount = require('../../../service-account-key.json')

console.log('Initializing Firebase admin app')

// https://firebase.google.com/docs/admin/setup
const adminApp =
  getApps()[0] ??
  initializeApp(
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      credential: cert(serviceAccount as any),
    },
    'admin',
  )

// https://firebase.google.com/docs/auth/admin/manage-users
export const auth = getAuth(adminApp)

// https://firebase.google.com/docs/firestore/manage-data/add-data#node.js
export const db = getFirestore(adminApp)
