import type {
  QueryResolvers,
  MutationResolvers,
  ConversationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { userConversationsIdsByUserId } from '../userConversations/userConversations'

export const conversations: QueryResolvers['conversations'] = () => {
  return db.conversation.findMany()
}

export const getConversationsByUserId: QueryResolvers['getConversationsByUserId'] =
  async ({ userId }) => {
    const userConversationIds = await userConversationsIdsByUserId({ userId })
    return db.conversation.findMany({
      where: {
        id: { in: userConversationIds.map((item) => item.conversationId) },
      },
    })
  }

export const conversation: QueryResolvers['conversation'] = ({ id }) => {
  return db.conversation.findUnique({
    where: { id },
  })
}

export const createConversation: MutationResolvers['createConversation'] =
  async ({ input }) => {
    const foundConversations = await db.userConversation.findMany({
      where: {
        userId: { in: [input.sourceUserId, input.targetUserId] },
      },
      select: { conversation: true, conversationId: true },
    })

    const duplicates = foundConversations
      .map((val) => val.conversationId)
      .filter((val, index, a) => a.indexOf(val) !== index) // [2, 4]

    console.dir(duplicates)

    if (duplicates.length === 1) {
      return foundConversations.find(
        (conv) => conv.conversationId === duplicates[0]
      ).conversation
    }

    const newConversation = await db.conversation.create({
      data: { title: input.title },
    })

    await db.userConversation.create({
      data: { conversationId: newConversation.id, userId: input.sourceUserId },
    })

    await db.userConversation.create({
      data: { conversationId: newConversation.id, userId: input.targetUserId },
    })

    return newConversation
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

export const Conversation: ConversationResolvers = {
  UserConversation: (_obj, { root }) =>
    db.conversation.findUnique({ where: { id: root.id } }).UserConversation(),
  ChatRecord: (_obj, { root }) =>
    db.conversation.findUnique({ where: { id: root.id } }).ChatRecord(),
}
