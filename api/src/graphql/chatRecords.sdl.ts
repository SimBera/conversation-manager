export const schema = gql`
  type ChatRecord {
    id: Int!
    createdBy: User!
    createdById: Int!
    message: String!
    timeStamp: DateTime!
    conversationId: Int!
    conversation: Conversation!
  }

  type Query {
    chatRecords: [ChatRecord!]! @requireAuth
    chatRecord(id: Int!): ChatRecord @requireAuth
  }

  input CreateChatRecordInput {
    createdById: Int!
    message: String!
    timeStamp: DateTime!
    conversationId: Int!
  }

  input UpdateChatRecordInput {
    createdById: Int
    message: String
    timeStamp: DateTime
    conversationId: Int
  }

  type Mutation {
    createChatRecord(input: CreateChatRecordInput!): ChatRecord! @requireAuth
    updateChatRecord(id: Int!, input: UpdateChatRecordInput!): ChatRecord!
      @requireAuth
    deleteChatRecord(id: Int!): ChatRecord! @requireAuth
  }
`
