import './App.css'
import { useAuth } from './hooks/useAuth'
import { signIn, signOutUser } from './lib/auth'

function App() {
  const { user, loading } = useAuth()

  if (loading) return <p>Checking sign-in…</p>

  if (!user) {
    return (
      <button type="button" onClick={() => void signIn()}>
        Sign in with Google
      </button>
    )
  }

  return (
    <div>
      <p>Signed in as {user.displayName ?? user.email}</p>
      <button type="button" onClick={() => void signOutUser()}>
        Sign out
      </button>
    </div>
  )
}

export default App
