import { User } from '../../../../types/graphql'

export const UserCard = ({ user, onClick }: UserCartProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={() => onClick()}>
      <img src={user.imageUrl} alt={'profilePicture'} width="300px" />
      <br />
      Username: {user.username}
      <br />
      Role: {user.role}
    </div>
  )
}

export interface UserCartProps {
  user: User
  onClick?: () => void
}
