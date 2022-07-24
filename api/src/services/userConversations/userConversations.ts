import type {
  QueryResolvers,
  MutationResolvers,
  UserConversationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userConversations: QueryResolvers['userConversations'] = () => {
  return db.userConversation.findMany()
}

export const userConversation: QueryResolvers['userConversation'] = ({
  id,
}) => {
  return db.userConversation.findUnique({
    where: { id },
  })
}

export const userConversationsIdsByUserId = ({ userId }) => {
  return db.userConversation.findMany({
    where: { userId: userId },
    select: { conversationId: true },
  })
}

export const createUserConversation: MutationResolvers['createUserConversation'] =
  ({ input }) => {
    return db.userConversation.create({
      data: input,
    })
  }

export const updateUserConversation: MutationResolvers['updateUserConversation'] =
  ({ id, input }) => {
    return db.userConversation.update({
      data: input,
      where: { id },
    })
  }

export const deleteUserConversation: MutationResolvers['deleteUserConversation'] =
  ({ id }) => {
    return db.userConversation.delete({
      where: { id },
    })
  }

export const UserConversation: UserConversationResolvers = {
  user: (_obj, { root }) =>
    db.userConversation.findUnique({ where: { id: root.id } }).user(),
  conversation: (_obj, { root }) =>
    db.userConversation.findUnique({ where: { id: root.id } }).conversation(),
}
