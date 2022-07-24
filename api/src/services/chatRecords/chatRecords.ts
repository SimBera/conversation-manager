import type {
  QueryResolvers,
  MutationResolvers,
  ChatRecordResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const chatRecords: QueryResolvers['chatRecords'] = () => {
  return db.chatRecord.findMany()
}

export const chatRecord: QueryResolvers['chatRecord'] = ({ id }) => {
  return db.chatRecord.findUnique({
    where: { id },
  })
}

export const getChatRecordsByConversationId: QueryResolvers['getChatRecordsByConversationId'] =
  ({ conversationId }) => {
    return db.chatRecord.findMany({
      where: { conversationId },
    })
  }

export const createChatRecord: MutationResolvers['createChatRecord'] = ({
  input,
}) => {
  return db.chatRecord.create({
    data: input,
  })
}

export const updateChatRecord: MutationResolvers['updateChatRecord'] = ({
  id,
  input,
}) => {
  return db.chatRecord.update({
    data: input,
    where: { id },
  })
}

export const deleteChatRecord: MutationResolvers['deleteChatRecord'] = ({
  id,
}) => {
  return db.chatRecord.delete({
    where: { id },
  })
}

export const ChatRecord: ChatRecordResolvers = {
  createdBy: (_obj, { root }) =>
    db.chatRecord.findUnique({ where: { id: root.id } }).createdBy(),
  conversation: (_obj, { root }) =>
    db.chatRecord.findUnique({ where: { id: root.id } }).conversation(),
}
