import { render } from '@redwoodjs/testing/web'

import ConversationsPage from './ConversationsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ConversationsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ConversationsPage />)
    }).not.toThrow()
  })
})
