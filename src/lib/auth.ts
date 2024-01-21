import {
  type User,
  type Unsubscribe,
  createUserWithEmailAndPassword as createUser,
  signInWithEmailAndPassword as signIn,
  onAuthStateChanged as onAuthStateChangedByFirebase,
  signOut as signOutByFirebase,
} from 'firebase/auth'
import { auth } from './firebase/client'

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<{ user: User; error: null } | { user: null; error: Error }> => {
  try {
    const userCredential = await createUser(auth, email, password)
    const user = userCredential.user
    return { user, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { user: null, error }
    }
    return { user: null, error: new Error('Unknown error') }
  }
}

export const signInWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<{ user: User; error: null } | { user: null; error: Error }> => {
  try {
    const userCredential = await signIn(auth, email, password)
    const user = userCredential.user
    return { user, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { user: null, error }
    }
    return { user: null, error: new Error('Unknown error') }
  }
}

export const onAuthStateChanged = (callback: (user: User | null) => void): Unsubscribe => {
  const unsub = onAuthStateChangedByFirebase(auth, (user) => {
    callback(user)
  })
  return unsub
}

export const signOut = async () => {
  try {
    await signOutByFirebase(auth)
    return { error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { error }
    }
    return { error: new Error('Unknown error') }
  }
}
