
import { User } from '../../../../types/graphql'



const UsersList = ({ users }) => {
  return (
    <>
      {users.map((user) => {
        return (
          <>
            <UserCard user={user}></UserCard>
          </>
        )
      })}
    </>

    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         <th>Id</th>
    //         <th>Username</th>
    //         <th>Role</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {users.map((user) => (
    //         <tr
    //           key={user.id}
    //           onClick={() => navigate(routes.user({ id: user.id }))}
    //         >
    //           <td>{truncate(user.id)}</td>
    //           <td>{truncate(user.username)}</td>
    //           <td>{truncate(user.role)}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}

interface UserCartProps {
  user: User
}

export const UserCard = ({ user }: UserCartProps) => {
  return (
    <>
      <img src={user.imageUrl} alt={'profilePicture'} width="300px" />
      <br />
      Username: {user.username}
      <br />
      Role: {user.role}
    </>
  )
}

export default UsersList
