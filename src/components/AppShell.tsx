import { Alert, Button, Layout, Menu, Space, Typography, type MenuProps } from 'antd'
import { useState, type ReactNode } from 'react'
import {
  FileTextOutlined,
  HistoryOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import type { User } from 'firebase/auth'
import { signOutUser } from '../lib/auth'

const { Header, Footer, Sider, Content } = Layout
const { Text } = Typography

const NAV_ITEMS: MenuProps['items'] = [
  { key: 'lists', icon: <UnorderedListOutlined />, label: 'Lists' },
  { key: 'templates', icon: <FileTextOutlined />, label: 'Templates' },
  { key: 'runs', icon: <HistoryOutlined />, label: 'History' },
]

const DEFAULT_NAV_KEY = 'lists'

interface AppShellProps {
  user: User
  children?: ReactNode
}

function AppShell({ user, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState(DEFAULT_NAV_KEY)
  const [signOutFailed, setSignOutFailed] = useState(false)

  const handleSignOut = async () => {
    setSignOutFailed(false)
    try {
      await signOutUser()
    } catch {
      setSignOutFailed(true)
    }
  }

  return (
    <Layout className="h-dvh">
      <Sider
        collapsible
        collapsed={collapsed}
        collapsedWidth="0"
        trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onCollapse={(next) => setCollapsed(next)}
      >
        <div className="overflow-hidden px-6 py-4 font-semibold whitespace-nowrap text-white">
          Runlist
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={NAV_ITEMS}
          selectedKeys={[selectedKey]}
          onSelect={({ key }) => setSelectedKey(key)}
        />
      </Sider>
      <Layout>
        <Header className="flex items-center justify-end gap-3">
          <Space>
            <Text>{user.displayName ?? user.email}</Text>
            <Button onClick={() => void handleSignOut()}>Sign out</Button>
          </Space>
        </Header>
        {signOutFailed && (
          <Alert
            banner
            type="error"
            message="Could not sign out. Check your connection and try again."
            closable
            onClose={() => setSignOutFailed(false)}
          />
        )}
        <Content className="overflow-y-auto p-6">{children}</Content>
        <Footer className="text-center">
          <Text type="secondary">Runlist</Text>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AppShell
