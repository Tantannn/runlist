import { Flex, Spin } from 'antd'
import AppShell from './components/AppShell'
import SignInScreen from './components/SignInScreen'
import { useAuth } from './hooks/useAuth'
import Content from './components/Content'

/**
 * Auth gate. Owns the three top-level states and nothing else — the shell
 * assumes a signed-in user, so it never has to branch on one.
 */
function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Flex className="h-dvh" align="center" justify="center">
        <Spin size="large" tip="Checking sign-in…">
          <div className="p-6" />
        </Spin>
      </Flex>
    )
  }

  if (!user) return <SignInScreen />

  return <AppShell user={user}>
    <Content />
  </AppShell>
}

export default App
