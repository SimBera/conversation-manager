import { render } from '@redwoodjs/testing/web'

import ConversationPage from './ConversationPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ConversationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ConversationPage />)
    }).not.toThrow()
  })
})
