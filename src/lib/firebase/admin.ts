import admin from 'firebase-admin'
import { getApp, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccount = require('../../../service-account-key.json')

console.log('Initializing Firebase admin app')

// https://firebase.google.com/docs/admin/setup
const adminApp = initializeApp({
  credential: admin.credential.cert(serviceAccount),
}, 'admin')

// https://firebase.google.com/docs/auth/admin/manage-users
export const auth = getAuth(adminApp)

// https://firebase.google.com/docs/firestore/manage-data/add-data#node.js
export const db = getFirestore(adminApp)
