import { Box } from '@mui/material'

import { useAuth } from '@redwoodjs/auth'

import ConversationsCell from 'src/components/ConversationsCell'

const ConversationsPage = () => {
  const { currentUser } = useAuth()
  return (
    <Box sx={{ height: '100%' }}>
      <ConversationsCell userId={currentUser.id} />
    </Box>
  )
}

export default ConversationsPage
