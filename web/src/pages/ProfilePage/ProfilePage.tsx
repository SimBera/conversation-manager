import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { FieldError, FileField, Form, Label, Submit } from '@redwoodjs/forms'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { RequestResetSegment } from 'src/components/Profile/RequestReset'
import { ResetPasswordSegment } from 'src/components/Profile/ResetPasswordSegment'
import { UPDATE_USER_MUTATION } from 'src/components/User/EditUserCell'
import { QUERY } from 'src/components/User/UserCell'

const ProfilePage = () => {
  const { currentUser } = useAuth()
  const [resetToken, setResetToken] = useState(null)
  const [img, setImg] = useState('male-placeholder-image.jpeg')

  const query = useQuery(QUERY, {
    onCompleted: () => setImg(query.data.user.imageUrl),
    variables: { id: currentUser.id },
  })

  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Image updated')
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message)
    },
  })

  const onSubmit = (data) => {
    const reader = new FileReader()
    reader.addEventListener('load', async () => {
      const { data } = await updateUser({
        variables: {
          id: currentUser.id,
          input: { imageUrl: reader.result as string },
        },
      })
      console.log(data.updateUser)

      setImg(data.updateUser.imageUrl)
    })
    reader.readAsDataURL(data.profileImage[0])
  }

  return (
    <>
      {loading ? (
        <LoadingSegment />
      ) : (
        <img src={img} alt="profile_picture" height={'300px'} />
      )}
      <br />
      UserName: {currentUser.username}
      <br />
      Role {currentUser.role}
      <br />
      <Form onSubmit={onSubmit} className="rw-form-wrapper">
        <Label
          name="password"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Select image
        </Label>

        <FileField
          accept="image/*"
          className="rw-button rw-button-blue"
          name="profileImage"
        />
        <FieldError name="profileImage" className="rw-field-error" />

        <Submit className="rw-button rw-button-blue">Upload image</Submit>
      </Form>
      {resetToken ? (
        <ResetPasswordSegment resetToken={resetToken} />
      ) : (
        <RequestResetSegment setResetToken={setResetToken} />
      )}
    </>
  )
}

const LoadingSegment = () => {
  return <span>Loading...</span>
}

export default ProfilePage
