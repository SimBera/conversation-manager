import { useState } from 'react'

import SendIcon from '@mui/icons-material/Send'
import { List, Paper, TextField, IconButton, Box, Grid } from '@mui/material'
import type {
  FindConversationQuery,
  FindConversationQueryVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'

import ChatRecordsCell from '../ChatRecordsCell'

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

export const CREATE_RECORD = gql`
  mutation CreatRecord($input: CreateChatRecordInput!) {
    createChatRecord(input: $input) {
      id
      message
      timeStamp
      createdBy {
        id
        username
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
  const [createChatRecord] = useMutation(CREATE_RECORD)
  const [message, setMessage] = useState('')

  const onFieldChange = (data) => {
    setMessage(data.nativeEvent.target.value)
  }

  const onButtonClick = async () => {
    await createChatRecord({
      variables: {
        input: {
          createdById: currentUser.id,
          message: message,
          timeStamp: new Date(),
          conversationId: conversation.id,
        },
      },
    })
    setMessage('')
  }

  const recordKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      onButtonClick()
    }
  }

  return (
    <Box component={Paper} elevation={3} sx={{ marginTop: 2, height: '70vh' }}>
      <List
        sx={{
          width: '100%',
          minHeight: '100%',
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="center"
        >
          <ChatRecordsCell conversationId={conversation.id}></ChatRecordsCell>
        </Grid>
      </List>
      <TextField
        onKeyDown={recordKeyDown}
        onChange={onFieldChange}
        value={message}
        sx={{ width: '94%' }}
      ></TextField>
      <IconButton onClick={onButtonClick} aria-label="comment">
        <SendIcon fontSize="large" />
      </IconButton>
    </Box>
  )
}
