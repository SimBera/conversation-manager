import { useAuth } from '@redwoodjs/auth'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { User } from '../../../../types/graphql'

import { UserCard } from './UserCard'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const UserProfile = ({ user }) => {
  const { currentUser } = useAuth()

  return (
    <>
      <button onClick={() => console.log('//TODO navigate to conversation')}>
        Send message
      </button>
      <UserCard user={user}></UserCard>
      {currentUser.role === 'admin' && <AdminUserActions user={user} />}
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
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }
  return (
    <nav className="rw-button-group">
      <Link
        to={routes.editUser({ id: user.id })}
        className="rw-button rw-button-blue"
      >
        Edit
      </Link>
      <button
        type="button"
        className="rw-button rw-button-red"
        onClick={() => onDeleteClick(user.id)}
      >
        Delete
      </button>
    </nav>
  )
}

interface AdminUserActionsProps {
  user: User
}

export default UserProfile
