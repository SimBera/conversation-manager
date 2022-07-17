import { Fragment, useEffect, useState } from 'react'

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  List,
} from '@mui/material'
import type { ChatRecordsQuery } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { CellSuccessProps, CellFailureProps, useQuery } from '@redwoodjs/web'

export const QUERY = gql`
  query ChatRecordsQuery {
    chatRecords {
      id
      timeStamp
      message
      conversationId
      createdBy {
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
  conversation,
}: CellSuccessProps<ChatRecordsQuery>) => {
  const { currentUser } = useAuth()
  const [records, setRecords] = useState(chatRecords)

  const { data } = useQuery(QUERY, { pollInterval: 50 })

  useEffect(() => {
    const filterd = data.chatRecords.filter(
      (record) => record.conversationId === conversation.id
    )
    setRecords(filterd)
  }, [data])

  return (
    <>
      {records &&
        records.map((item) => {
          return (
            <ListItem
              key={item.id}
              alignItems={
                currentUser.id === item.createdBy.id ? 'flex-start' : 'center'
              }
            >
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={item.imageUrl || './male-placeholder-image'}
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
          )
        })}
    </>
  )
}
