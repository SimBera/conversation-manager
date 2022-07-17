import { ChangeEvent, ChangeEventHandler, useState } from 'react'

import { PhotoCamera } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

import { useAuth } from '@redwoodjs/auth'
import { FieldError, FileField, Form, Label, Submit } from '@redwoodjs/forms'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { RequestResetSegment } from 'src/components/Profile/RequestReset'
import { ResetPasswordSegment } from 'src/components/Profile/ResetPasswordSegment'
import { UPDATE_USER_MUTATION } from 'src/components/User/EditUserCell'
import { QUERY } from 'src/components/User/UserCell'

const ProfilePage = () => {
  const { currentUser, getCurrentUser } = useAuth()
  const [resetToken, setResetToken] = useState(null)
  const [img, setImg] = useState('male-placeholder-image.jpeg')

  const query = useQuery(QUERY, {
    onCompleted: () => setImg(query.data.user.imageUrl),
    variables: { id: currentUser.id },
  })

  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      getCurrentUser()
      toast.success('Image updated')
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message)
    },
  })

  const uploadPhoto = (input: ChangeEvent<HTMLInputElement>) => {
    const file = input.target.files[0]
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
    reader.readAsDataURL(file)
  }

  return (
    <Container sx={{ padding: 2 }}>
      <Paper
        color="inherit"
        elevation={3}
        sx={{ width: 1200, height: 600, padding: 2 }}
      >
        {loading ? (
          <LoadingSegment />
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid item xs={5}>
                <Box
                  sx={{ maxWidth: 400, maxHeight: 400 }}
                  component="img"
                  src={img || 'male-placeholder-image.jpeg'}
                  alt="profile_picture"
                ></Box>
              </Grid>
              <Grid item xs={5}>
                <Grid container>
                  <Grid item xs={12}>
                    <Button variant="contained" component="label">
                      <PhotoCamera />
                      <Typography>Upload</Typography>
                      <input
                        onChange={uploadPhoto}
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography> Username: {currentUser.username}</Typography>
                    <Typography> Role: {currentUser.role}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    {resetToken ? (
                      <ResetPasswordSegment resetToken={resetToken} />
                    ) : (
                      <RequestResetSegment setResetToken={setResetToken} />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  )
}

const LoadingSegment = () => {
  return <span>Loading...</span>
}

export default ProfilePage
