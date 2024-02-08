import admin from 'firebase-admin'
import { decryptGCPServiceAccount } from "../../../decrypt";

const serviceAccount = decryptGCPServiceAccount()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
