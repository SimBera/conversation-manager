import { Fragment } from 'react'

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Grid,
} from '@mui/material'
import {
  getChatRecordsByConversationId,
  getChatRecordsByConversationIdVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { CellSuccessProps, CellFailureProps, useQuery } from '@redwoodjs/web'

export const QUERY = gql`
  query getChatRecordsByConversationId($conversationId: Int!) {
    chatRecords: getChatRecordsByConversationId(
      conversationId: $conversationId
    ) {
      id
      timeStamp
      message
      conversationId
      createdBy {
        id
        imageUrl
        username
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
  chatRecords,
}: CellSuccessProps<
  getChatRecordsByConversationId,
  getChatRecordsByConversationIdVariables
>) => {
  const { currentUser } = useAuth()

  useQuery(QUERY, {
    variables: { conversationId: chatRecords[0].conversationId || null },
    pollInterval: 100,
  })

  return (
    <>
      {chatRecords.map((item) => {
        return (
          <Grid
            alignSelf={
              currentUser.id === item?.createdBy?.id ? 'flex-start' : 'flex-end'
            }
            key={item.id}
            item
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={item?.createdBy?.imageUrl || './male-placeholder-image'}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.createdBy.username}
                secondary={
                  <Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.message}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
          </Grid>
        )
      })}
    </>
  )
}
