import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { subscribeToAuth } from '../lib/auth'

/**
 * Current sign-in state.
 *
 * `loading` is true until Firebase reports back on startup. While it is true,
 * a null `user` means "not known yet" — not "signed out".
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToAuth((nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return { user, loading }
}
