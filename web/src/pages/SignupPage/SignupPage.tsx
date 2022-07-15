import { useRef } from 'react'
import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
  RadioField,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const SignupPage = () => {
  const { signUp } = useAuth()

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     logOut()
  //     navigate(routes.login())
  //   }
  // }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  const password = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await signUp({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      navigate(routes.login())

      toast.success('Registered Successfully!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Register</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="username"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Username
                  </Label>
                  <TextField
                    name="username"
                    className="rw-input"
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

                  <Label
                    name="role"
                    className="rw-label"
                    style={{ marginBottom: '5px' }}
                    errorClassName="rw-label rw-label-error"
                  >
                    Role
                  </Label>
                  <Label
                    name="role"
                    style={{ marginRight: '5px' }}
                    errorClassName="rw-label rw-label-error"
                  >
                    User
                  </Label>
                  <RadioField
                    className="rw-input"
                    name="role"
                    value="user"
                    defaultValue="user"
                    validation={{
                      required: {
                        value: true,
                        message: 'Role must be selected',
                      },
                    }}
                  ></RadioField>
                  <Label
                    name="role"
                    style={{ marginRight: '5px' }}
                    errorClassName="rw-label rw-label-error"
                  >
                    Admin
                  </Label>

                  <RadioField
                    value="admin"
                    className="rw-input"
                    name="role"
                  ></RadioField>
                  <FieldError name="role" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    ref={password}
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                      maxLength: {
                        value: 20,
                        message: 'Maximum symbol number reached',
                      },
                      minLength: {
                        value: 4,
                        message: 'Password too short',
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,20}$/,
                        message:
                          'Password mus contain at least 1 upper case, special symbol',
                      },
                    }}
                  />
                  <FieldError name="password" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Repeat Password
                  </Label>
                  <PasswordField
                    name="repeat_password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{
                      validate: (value) =>
                        value === password.current.value ||
                        'The passwords do not match',
                      required: {
                        value: true,
                        message: 'You must repeat password',
                      },
                    }}
                  />
                  <FieldError
                    name="repeat_password"
                    className="rw-field-error"
                  />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Register
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
