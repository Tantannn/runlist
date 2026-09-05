
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

// it('shows the edited name in read mode after Enter', async () => {
//   const { default: Content } = await import('../components/Content')
//   const user = userEvent.setup()
//   render(<Content />)

//   await user.click(screen.getByText('This is panel header 1'))
//   await screen.findByText('John Brown')
//   await user.dblClick(screen.getByText('John Brown'))

//   const input = await screen.findByDisplayValue('John Brown')
//   await user.clear(input)
//   await user.type(input, 'Renamed')
//   await user.keyboard('{Enter}')

//   await waitFor(() => {
//     expect(screen.queryByDisplayValue('Renamed')).not.toBeInTheDocument()
//   })
//   expect(screen.getByText('Renamed')).toBeInTheDocument()
//   expect(screen.queryByText('John Brown')).not.toBeInTheDocument()
// }, 60000)

// it('Escape discards the edit', async () => {
//   const { default: Content } = await import('../components/Content')
//   // const user = userEvent.setup()
//   render(<Content />)
//   await waitFor(() => {
//     expect(screen.queryByDisplayValue('Discarded')).not.toBeInTheDocument()
//   })
//   expect(screen.getByText('Jim Green')).toBeInTheDocument()
// }, 60000)
