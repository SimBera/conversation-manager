import { Fragment, useEffect, useState } from 'react'

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
import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'

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
  const [createChatRecord, { data }] = useMutation(CREATE_RECORD)
  const [message, setMessage] = useState('asd')

  const onFieldChange = (data) => {
    setMessage(data.nativeEvent.target.value)
  }

  const onButtonClick = () => {
    createChatRecord({
      variables: {
        input: {
          createdById: currentUser.id,
          message: message,
          timeStamp: new Date(),
          conversationId: conversation.id,
        },
      },
    })
  }

  return (
    <>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <CharRecordsCell conversation={conversation}></CharRecordsCell>
        </List>
        <Paper>
          <TextField onChange={onFieldChange} sx={{ width: '94%' }}></TextField>
          <IconButton onClick={onButtonClick} aria-label="comment">
            <SendIcon fontSize="large" />
          </IconButton>
        </Paper>
      </Paper>
    </>
  )
}
