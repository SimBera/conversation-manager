import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ConversationsPage = () => {
  return (
    <>
      <MetaTags title="Conversations" description="Conversations page" />

      <h1>ConversationsPage</h1>
      <p>
        Find me in <code>./web/src/pages/ConversationsPage/ConversationsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>conversations</code>, link to me with `
        <Link to={routes.conversations()}>Conversations</Link>`
      </p>
    </>
  )
}

export default ConversationsPage
