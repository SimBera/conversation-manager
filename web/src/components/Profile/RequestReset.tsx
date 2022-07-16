import { useAuth } from '@redwoodjs/auth'
import { Form, FieldError, Submit } from '@redwoodjs/forms'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

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
