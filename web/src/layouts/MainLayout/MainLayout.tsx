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
          <Link to={routes.profile()}>Profile</Link>{' '}
          <Link onClick={logOut} to={routes.login()}>
            Logout
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default MainLayout
