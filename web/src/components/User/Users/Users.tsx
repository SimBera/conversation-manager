import { Grid } from '@mui/material'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

import { UserCard } from '../User/UserCard'

const UsersList = ({ users }) => {
  const { currentUser } = useAuth()
  const navigation = (id: number) => {
    if (currentUser.id === id) {
      navigate(routes.profile())
    } else {
      navigate(routes.user({ id }))
    }
  }

  return (
    <Grid container>
      {users.map((user) => {
        return (
          <Grid key={user.id} item>
            <UserCard user={user} onClick={() => navigation(user.id)} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default UsersList
