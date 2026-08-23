import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (q: string) => ({
      matches: false, media: q, onchange: null,
      addListener: () => {}, removeListener: () => {},
      addEventListener: () => {}, removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

it('shows the edited name in read mode after Enter', async () => {
  const { default: Content } = await import('../components/Content')
  const user = userEvent.setup()
  render(<Content />)

  await screen.findByText('John Brown')
  await user.dblClick(screen.getByText('John Brown'))

  const input = await screen.findByDisplayValue('John Brown')
  await user.clear(input)
  await user.type(input, 'Renamed')
  await user.keyboard('{Enter}')

  await waitFor(() => {
    expect(screen.queryByDisplayValue('Renamed')).not.toBeInTheDocument()
  })
  expect(screen.getByText('Renamed')).toBeInTheDocument()
  expect(screen.queryByText('John Brown')).not.toBeInTheDocument()
}, 60000)

it('Escape discards the edit', async () => {
  const { default: Content } = await import('../components/Content')
  const user = userEvent.setup()
  render(<Content />)

  await screen.findByText('Jim Green')
  await user.dblClick(screen.getByText('Jim Green'))

  const input = await screen.findByDisplayValue('Jim Green')
  await user.clear(input)
  await user.type(input, 'Discarded')
  await user.keyboard('{Escape}')

  await waitFor(() => {
    expect(screen.queryByDisplayValue('Discarded')).not.toBeInTheDocument()
  })
  expect(screen.getByText('Jim Green')).toBeInTheDocument()
}, 60000)
