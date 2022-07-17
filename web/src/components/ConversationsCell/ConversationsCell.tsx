import { useEffect, useState } from 'react'

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
  Grid,
} from '@mui/material'
import type { ConversationsQuery } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ConversationCell from '../ConversationCell'

export const QUERY = gql`
  query ConversationsQuery {
    conversations {
      id
      title
      UserConversation {
        id
        userId
      }
    }
  }
`
export const CREATE_CONVERSATION = gql`
  mutation CreateConversationMutation($input: CreateConversationInput!) {
    createConversation(input: $input) {
      id
      UserConversation {
        userId
      }
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
}: CellSuccessProps<ConversationsQuery>) => {
  const { currentUser } = useAuth()
  const [selectedConversation, setSelectedConversation] = useState(undefined)
  const [yourConversations, setYourConversations] = useState([])

  useEffect(() => {
    const conversationsFiltered = conversations.filter(
      (conv) =>
        conv.UserConversation.filter(
          (userconv) => userconv.userId === currentUser.id
        ).length
    )

    setYourConversations(conversationsFiltered)
  }, [conversations])

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container>
        <Grid item xs={4}>
          <List>
            {yourConversations &&
              yourConversations.map((conversation) => {
                return (
                  <ListItem
                    onClick={() => setSelectedConversation(conversation)}
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
                  </ListItem>
                )
              })}
          </List>
        </Grid>
        <Grid item xs={8}>
          {selectedConversation && (
            <ConversationCell id={selectedConversation.id}></ConversationCell>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
