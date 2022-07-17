import { Container, Grid, Button } from '@mui/material'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { logOut } = useAuth()

  return (
    <>
      <Grid container>
        <Grid xs={4}>
          <Button component={Link} to={routes.profile()}>
            Profile
          </Button>
          <Button component={Link} to={routes.users()}>
            All Users
          </Button>
          <Button component={Link} to={routes.conversations()}>
            Conversations
          </Button>
        </Grid>
        <Grid xs={4}>
          <Button component={Link} onClick={logOut} to={routes.login()}>
            Logout
          </Button>
        </Grid>
      </Grid>
      <main>{children}</main>
    </>
  )

  // <>
  //   <header>
  //     <nav>
  //       <div
  //         style={{
  //           height: '300px',
  //           display: 'flex',
  //           justifyContent: 'space-evenly',
  //         }}
  //       >
  //         <div
  //           style={{
  //             display: 'flex',
  //             justifyContent: 'flex-start',
  //             flexGrow: 1,
  //             gap: '20px',
  //           }}
  //         >
  //           <Link to={routes.profile()}>Profile</Link>
  //           <Link to={routes.users()}>All Users </Link>
  //           <Link to={routes.conversations()}>Conversations</Link>
  //         </div>
  //         <div
  //           style={{
  //             display: 'flex',
  //             justifyContent: 'flex-end',
  //             flexGrow: 1,
  //           }}
  //         >
  //           <Link onClick={logOut} to={routes.login()}>
  //             Logout
  //           </Link>
  //         </div>
  //       </div>
  //     </nav>
  //   </header>
  //   <main>{children}</main>
  // </>
}

export default MainLayout
