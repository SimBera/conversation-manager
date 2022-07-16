import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { logOut } = useAuth()

  return (
    <>
      <header>
        <nav>
          <div
            style={{
              height: '300px',
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexGrow: 1,
                gap: '20px',
              }}
            >
              <Link to={routes.profile()}>Profile</Link>
              <Link to={routes.users()}>All Users </Link>
              <Link to={routes.conversations()}>Conversations</Link>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                flexGrow: 1,
              }}
            >
              <Link onClick={logOut} to={routes.login()}>
                Logout
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default MainLayout
