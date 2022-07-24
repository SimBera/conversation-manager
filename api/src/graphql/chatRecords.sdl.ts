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
    chatRecords: [ChatRecord!]! @skipAuth
    chatRecord(id: Int!): ChatRecord @skipAuth
    getChatRecordsByConversationId(conversationId: Int!): [ChatRecord!]!
      @skipAuth
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
    createChatRecord(input: CreateChatRecordInput!): ChatRecord! @skipAuth
    updateChatRecord(id: Int!, input: UpdateChatRecordInput!): ChatRecord!
      @skipAuth
    deleteChatRecord(id: Int!): ChatRecord! @skipAuth
  }
`
