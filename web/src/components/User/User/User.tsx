import { Button, Grid, Typography } from '@mui/material'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { CREATE_CONVERSATION } from 'src/components/ConversationsCell'

import { User as IUser } from '../../../../types/graphql'

import { UserCard } from './UserCard'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

export const QUERY_USER = gql`
  query getUser($id: Int!) {
    user(id: $id) {
      id
      username
      imageUrl
    }
  }
`

const User = ({ user }) => {
  const { currentUser } = useAuth()
  // const [createConversation, { loading }] = useMutation(CREATE_CONVERSATION, {
  //   variables: { userId: user.id },
  // })

  const handleOnclick = async () => {
    // const response = await createConversation()
    // if (response.data) {
    //   await createConversation({
    //     variables: { id: response.data.id, userId: user.id },
    //   })
    navigate(routes.conversations())
    // }
  }

  return (
    <>
      <UserCard user={user}></UserCard>
      <Grid container>
        <Grid item>
          <Button variant="contained" onClick={handleOnclick}>
            <Typography>Send message</Typography>
          </Button>
        </Grid>
        <Grid item>
          {currentUser.role === 'admin' && <AdminUserActions user={user} />}
        </Grid>
      </Grid>
    </>
  )
}

const AdminUserActions = ({ user }: AdminUserActionsProps) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete user ' + user.username + '?')
    ) {
      deleteUser({ variables: { id } })
    }
  }
  return (
    <>
      <Button
        variant="outlined"
        component={Link}
        to={routes.editUser({ id: user.id })}
      >
        Edit
      </Button>
      <Button
        type="button"
        variant="contained"
        color="error"
        className="rw-button-red"
        onClick={() => onDeleteClick(user.id)}
      >
        <Typography>Delete</Typography>
      </Button>
    </>
  )
}

interface AdminUserActionsProps {
  user: IUser
}

export default User
