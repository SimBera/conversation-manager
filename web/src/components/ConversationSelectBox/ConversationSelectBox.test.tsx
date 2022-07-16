import { render } from '@redwoodjs/testing/web'

import ConversationSelectBox from './ConversationSelectBox'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ConversationSelectBox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ConversationSelectBox />)
    }).not.toThrow()
  })
})
