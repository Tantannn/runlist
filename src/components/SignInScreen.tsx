import { Alert, Button, Card, Flex, Typography } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { signIn } from '../lib/auth'

const { Title, Paragraph } = Typography

/**
 * Firebase reports a user-dismissed popup as an error. That is a normal exit,
 * not a failure, so it must not surface as one.
 */
const CANCELLED_CODES = new Set([
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
  'auth/user-cancelled',
])

function SignInScreen() {
  const [pending, setPending] = useState(false)
  const [failed, setFailed] = useState(false)

  const handleSignIn = async () => {
    setPending(true)
    setFailed(false)
    try {
      await signIn()
    } catch (cause) {
      const code = (cause as { code?: string }).code
      if (code === undefined || !CANCELLED_CODES.has(code)) setFailed(true)
    } finally {
      setPending(false)
    }
  }

  return (
    <Flex className="h-dvh p-6" align="center" justify="center">
      <Card className="w-full max-w-sm">
        <Title level={3}>Runlist</Title>
        <Paragraph type="secondary">
          Your todo lists and repeatable checklists, on every device.
        </Paragraph>
        {failed && (
          <Alert
            className="mb-4"
            type="error"
            message="Sign-in did not complete. Try again."
          />
        )}
        <Button
          type="primary"
          block
          icon={<GoogleOutlined />}
          loading={pending}
          onClick={() => void handleSignIn()}
        >
          Sign in with Google
        </Button>
      </Card>
    </Flex>
  )
}

export default SignInScreen
