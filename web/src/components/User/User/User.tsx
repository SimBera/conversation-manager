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
  const [createConversation, { loading }] = useMutation(CREATE_CONVERSATION)

  const handleOnclick = async () => {
    const response = await createConversation({
      variables: {
        input: {
          title: `chat with: ${user.username} and  ${currentUser.username}`,
          sourceUserId: currentUser.id,
          targetUserId: user.id,
        },
      },
    })
    const id = response.data.createConversation.id
    if (id) {
      navigate(routes.conversations({ conversationId: id }))
    }
  }

  return (
    <>
      <UserCard user={user}></UserCard>
      <Grid container>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleOnclick}
            disabled={loading}
          >
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
  const [deleteUser, { loading }] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = () => {
    if (
      confirm('Are you sure you want to delete user ' + user.username + '?')
    ) {
      deleteUser({ variables: { id: user.id } })
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
        onClick={onDeleteClick}
        disabled={loading}
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
