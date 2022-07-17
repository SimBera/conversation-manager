import { Button, Typography } from '@mui/material'

import { useAuth } from '@redwoodjs/auth'
import { Form, FieldError, Submit } from '@redwoodjs/forms'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

export const RequestResetSegment = ({ setResetToken }) => {
  const { forgotPassword, currentUser } = useAuth()

  const onSubmit = async () => {
    const response = await forgotPassword(currentUser.username)
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
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Form onSubmit={onSubmit} className="rw-form-wrapper">
        <div className="text-left">
          <FieldError name="password" className="rw-field-error" />
        </div>
        <Button component={Submit} className="rw-button rw-button-blue">
          <Typography>Reset Password</Typography>
        </Button>
      </Form>
    </>
  )
}
