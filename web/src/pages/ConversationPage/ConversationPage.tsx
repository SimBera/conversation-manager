import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ConversationPage = () => {
  return (
    <>
      <MetaTags title="Conversation" description="Conversation page" />

      <h1>ConversationPage</h1>
      <p>
        Find me in <code>./web/src/pages/ConversationPage/ConversationPage.tsx</code>
      </p>
      <p>
        My default route is named <code>conversation</code>, link to me with `
        <Link to={routes.conversation()}>Conversation</Link>`
      </p>
    </>
  )
}

export default ConversationPage
