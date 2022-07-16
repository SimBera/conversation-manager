import type {
  FindConversationQuery,
  FindConversationQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindConversationQuery($id: Int!) {
    conversation: conversation(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindConversationQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  conversation,
}: CellSuccessProps<FindConversationQuery, FindConversationQueryVariables>) => {
  return <div>{JSON.stringify(conversation)}</div>
}
