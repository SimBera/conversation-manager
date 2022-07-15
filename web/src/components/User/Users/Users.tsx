import { navigate, routes } from '@redwoodjs/router'

// const DELETE_USER_MUTATION = gql`
//   mutation DeleteUserMutation($id: Int!) {
//     deleteUser(id: $id) {
//       id
//     }
//   }
// `

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const UsersList = ({ users }) => {
  // const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
  //   onCompleted: () => {
  //     toast.success('User deleted')
  //   },
  //   onError: (error) => {
  //     toast.error(error.message)
  //   },
  //   // This refetches the query on the list page. Read more about other ways to
  //   // update the cache over here:
  //   // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
  //   refetchQueries: [{ query: QUERY }],
  //   awaitRefetchQueries: true,
  // })

  // const onDeleteClick = (id) => {
  //   if (confirm('Are you sure you want to delete user ' + id + '?')) {
  //     deleteUser({ variables: { id } })
  //   }
  // }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => navigate(routes.user({ id: user.id }))}
            >
              <td>{truncate(user.id)}</td>
              <td>{truncate(user.username)}</td>
              <td>{truncate(user.role)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
