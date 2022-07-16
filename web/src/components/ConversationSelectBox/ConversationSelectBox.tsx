import { useQuery } from '@redwoodjs/web'

import { QUERY_USER } from '../User/User'

interface BoxWrapperProps {
  userId: number
}

interface ConversationSelectBox {
  loading?: boolean
  data: any
}

export const ConversationSelectBox = ({
  loading,
  data,
}: ConversationSelectBox) => {
  return <>{loading ? <>loading</> : <>{JSON.stringify(data)}</>}</>
}

const BoxWrapper = ({ userId }: BoxWrapperProps) => {
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { id: userId },
  })
  return <ConversationSelectBox loading={loading} data={data} />
}

export default BoxWrapper
