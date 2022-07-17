import { Card, CardMedia, CardContent, Typography } from '@mui/material'

import { User } from '../../../../types/graphql'

export const UserCard = ({ user, onClick }: UserCartProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={() => onClick()}>
      <Card sx={{ width: 300, height: 400, margin: 1 }}>
        <CardMedia
          sx={{ maxWidth: 400 }}
          component="img"
          height="300"
          image={user.imageUrl}
          alt="profilePicture"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Username: {user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Role: {user.role}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export interface UserCartProps {
  user: User
  onClick?: () => void
}
