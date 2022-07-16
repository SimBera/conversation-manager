import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const chatRecords: QueryResolvers['chatRecords'] = () => {
  return db.chatRecord.findMany()
}

export const chatRecord: QueryResolvers['chatRecord'] = ({ id }) => {
  return db.chatRecord.findUnique({
    where: { id },
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
