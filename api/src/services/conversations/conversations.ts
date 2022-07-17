import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const conversations: QueryResolvers['conversations'] = () => {
  return db.conversation.findMany()
}

export const conversation: QueryResolvers['conversation'] = ({ id }) => {
  return db.conversation.findUnique({
    where: { id },
  })
}

interface findConversationByUserPairProps {
  user1: number
  user2: number
}

export const findConversationByUserPair: QueryResolvers['conversation'] = ({
  user1,
  user2,
}: findConversationByUserPairProps) => {
  return db.conversation.findMany({
    where: {
      UserConversation: { every: { OR: [{ id: user1 }, { id: user2 }] } },
    },
  })[0]
}

export const createConversation: MutationResolvers['createConversation'] = ({
  input,
}) => {
  return db.conversation.create({
    data: input,
  })
}

export const updateConversation: MutationResolvers['updateConversation'] = ({
  id,
  input,
}) => {
  return db.conversation.update({
    data: input,
    where: { id },
  })
}

export const deleteConversation: MutationResolvers['deleteConversation'] = ({
  id,
}) => {
  return db.conversation.delete({
    where: { id },
  })
}
