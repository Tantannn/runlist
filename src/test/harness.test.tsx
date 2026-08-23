import { render, screen } from '@testing-library/react'

// Proves jsdom + Testing Library + jest-dom matchers are wired up.
// Delete this once you have a real test.
it('renders into jsdom', () => {
  render(<p>ready</p>)
  expect(screen.getByText('ready')).toBeInTheDocument()
})
