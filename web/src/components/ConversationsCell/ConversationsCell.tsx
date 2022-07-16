import type { ConversationsQuery } from 'types/graphql'

import { CellSuccessProps, CellFailureProps, useQuery } from '@redwoodjs/web'

import { QUERY_USER } from '../User/User/User'

export const QUERY = gql`
  query ConversationsQuery {
    conversations {
      id
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No Conversations Found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  conversations,
}: CellSuccessProps<ConversationsQuery>) => {
  return (
    <ul>
      {conversations.map((item) => {
        return (
          <li key={item.id}>
            <ConversationSelectBox userId={item.userId} />
          </li>
        )
      })}
    </ul>
  )
}



