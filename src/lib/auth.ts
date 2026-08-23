import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth, googleProvider } from './firebase'

/** Open the Google popup. Resolves once the popup closes successfully. */
export async function signIn(): Promise<void> {
  await signInWithPopup(auth, googleProvider)
}

/** Sign the current user out. */
export async function signOutUser(): Promise<void> {
  await signOut(auth)
}

/**
 * Listen for sign-in state. `onChange` fires once shortly after startup with
 * the restored user (or null), then again on every sign-in and sign-out.
 * Returns the unsubscribe function.
 */
export function subscribeToAuth(
  onChange: (user: User | null) => void,
): () => void {
  return onAuthStateChanged(auth, onChange)
}

