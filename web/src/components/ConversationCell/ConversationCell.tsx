import { Fragment, useEffect } from 'react'

import SendIcon from '@mui/icons-material/Send'
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Paper,
  TextField,
  IconButton,
} from '@mui/material'
import type {
  FindConversationQuery,
  FindConversationQueryVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CharRecordsCell from '../ChatRecordsCell'

export const QUERY = gql`
  query FindConversationQuery($id: Int!) {
    conversation: conversation(id: $id) {
      id
      title
      UserConversation {
        userId
        user {
          id
          username
        }
      }
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
  const { currentUser } = useAuth()
  useEffect(() => {
    const guest = (conversation as any).UserConversation.find(
      (uConv) => uConv.userId !== currentUser.id
    ).user
    console.log(guest)
  }, [conversation])

  return (
    <>
      <Paper elevation={3}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <CharRecordsCell></CharRecordsCell>
        </List>
        <Paper>
          <TextField sx={{ width: '80%' }}></TextField>
          <IconButton aria-label="comment">
            <SendIcon sx={{ paddingLeft: 2 }} />
          </IconButton>
        </Paper>
      </Paper>
    </>
  )
}
