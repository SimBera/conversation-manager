import { useEffect, useRef, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  FieldError,
  Form,
  Label,
  PasswordField,
  Submit,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

const ProfilePage = () => {
  const { currentUser } = useAuth()
  const [resetToken, setResetToken] = useState(null)

  return (
    <>
      <img src="mm.jpg" alt="profile_picture" /> <br />
      UserName: {currentUser.username}
      <br />
      Role {currentUser.role}
      <br />
      {resetToken ? (
        <ResetPasswordSegment resetToken={resetToken} />
      ) : (
        <RequestResetSegment setResetToken={setResetToken} />
      )}
      {/* <ResetPasswordPage resetToken={resetToken} /> */}
    </>
  )
}

export const ResetPasswordSegment = ({ resetToken }) => {
  useEffect(() => {
    password.current.focus()
  }, [])
  const password = useRef<HTMLInputElement>()

  const { reauthenticate, validateResetToken, resetPassword } = useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [])

  const onSubmit = async (data) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
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
                    <Submit
                      disabled={!enabled}
                      className="rw-button rw-button-blue"
                    >
                      Reset Password
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const RequestResetSegment = ({ setResetToken }) => {
  const { forgotPassword, currentUser } = useAuth()

  const onSubmit = async () => {
    const response = await forgotPassword(currentUser.username)
    console.log(response)
    if (response.error) {
      toast.error(response.error)
    } else {
      setResetToken(response.resetToken)
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success('Reset initiated')
    }
  }
  return (
    <>
      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Reset Password
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
                    <FieldError name="password" className="rw-field-error" />
                  </div>

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Reset Password
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ProfilePage
