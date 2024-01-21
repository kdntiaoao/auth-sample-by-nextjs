import { readFileSync } from 'fs'
import admin from 'firebase-admin'

const serviceAccount = readFileSync('../../../service-account-key.json', 'utf8')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
