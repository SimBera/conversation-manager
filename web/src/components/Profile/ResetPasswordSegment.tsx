import { useEffect, useRef, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'

import { useAuth } from '@redwoodjs/auth'
import { Form, PasswordField, FieldError, Submit } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

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
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Form onSubmit={onSubmit} className="rw-form-wrapper">
        <Typography>Password</Typography>
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
        <Typography>Repeat Password</Typography>
        <Box
          component={PasswordField}
          name="repeat_password"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            validate: (value) =>
              value === password.current.value || 'The passwords do not match',
            required: {
              value: true,
              message: 'You must repeat password',
            },
          }}
        ></Box>
        <FieldError name="repeat_password" className="rw-field-error" />
        <Button
          component={Submit}
          disabled={!enabled}
          className="rw-button rw-button-blue"
        >
          <Typography>Reset Password</Typography>
        </Button>
      </Form>
    </>
  )
}
