import { useRef } from 'react'
import { useEffect } from 'react'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Input } from '@mui/material'
import { InputLabel } from '@mui/material'
import { OutlinedInput } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUITextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }
  const theme = createTheme()

  return (
    <>
      <ThemeProvider theme={theme}>
        <MetaTags title="Login" />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Form onSubmit={onSubmit} className="rw-form-wrapper">
                <InputLabel
                  name="username"
                  errorClassName="rw-label rw-label-error"
                >
                  Username
                </InputLabel>
                <TextField
                  // components={TextField}
                  name="username"
                  className="rw-input MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
                  errorClassName="rw-input rw-input-error"
                  ref={usernameRef}
                  validation={{
                    required: {
                      value: true,
                      message: 'Username is required',
                    },
                  }}
                />

                <FieldError name="username" className="rw-field-error" />

                <InputLabel
                  name="password"
                  errorClassName="rw-label rw-label-error"
                >
                  Password
                </InputLabel>
                <PasswordField
                  name="password"
                  className="rw-input MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
                  errorClassName="rw-input rw-input-error"
                  autoComplete="current-password"
                  validation={{
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  }}
                />
                <FieldError name="password" className="rw-field-error" />
                <Button component={Submit}>Login</Button>

                {/* <Submit className="rw-button rw-button-blue">Login</Submit> */}
              </Form>
            </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={routes.signup()} className="rw-link">
                  Sign up!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default LoginPage
