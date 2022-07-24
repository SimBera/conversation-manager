import { Grid, Button, AppBar, Toolbar, Typography } from '@mui/material'

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
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to={routes.profile()}>
              Profile
            </Button>
            <Button color="inherit" component={Link} to={routes.users()}>
              All Users
            </Button>
            <Button
              color="inherit"
              component={Link}
              to={routes.conversations()}
            >
              Conversations
            </Button>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button
              color="inherit"
              component={Link}
              onClick={logOut}
              to={routes.login()}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Grid>
      {children}
    </>
  )
}

export default MainLayout
