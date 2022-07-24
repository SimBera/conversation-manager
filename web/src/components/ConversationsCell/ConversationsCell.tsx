import { useState } from 'react'

import SendIcon from '@mui/icons-material/Send'
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  ListItemAvatar,
  Paper,
  Divider,
  Grid,
} from '@mui/material'
import type {
  getConversationsByUserId,
  getConversationsByUserIdVariables,
} from 'types/graphql'

import { useParams } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ConversationCell from '../ConversationCell'

export const QUERY = gql`
  query getConversationsByUserId($userId: Int!) {
    conversations: getConversationsByUserId(userId: $userId) {
      id
      title
    }
  }
`
export const CREATE_CONVERSATION = gql`
  mutation CreateConversationMutation($input: CreateConversationInput!) {
    createConversation(input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  conversations,
}: CellSuccessProps<
  getConversationsByUserId,
  getConversationsByUserIdVariables
>) => {
  const { conversationId } = useParams()
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | undefined
  >(Number(conversationId) || undefined)

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <Grid container>
        <Grid item xs={4}>
          <Paper sx={{ height: '100vh' }}>
            <List>
              {conversations.map((conversation) => {
                return (
                  <ListItem
                    onClick={() => setSelectedConversationId(conversation.id)}
                    key={conversation.id}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar alt="username" />
                      </ListItemAvatar>
                      <Typography>
                        {conversation.id} {conversation.title}
                      </Typography>
                      <ListItemIcon>
                        <SendIcon sx={{ paddingLeft: 2 }} />
                      </ListItemIcon>
                    </ListItemButton>
                    <Divider />
                  </ListItem>
                )
              })}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          {selectedConversationId && (
            <ConversationCell id={selectedConversationId} />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
