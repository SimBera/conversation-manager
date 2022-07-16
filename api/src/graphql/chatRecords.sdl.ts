export const schema = gql`
  type ChatRecord {
    id: Int!
    sourceId: Int!
    targetId: Int!
    message: String!
    timeStamp: DateTime!
    conversationId: Int!
  }

  type Query {
    chatRecords: [ChatRecord!]! @requireAuth
    chatRecord(id: Int!): ChatRecord @requireAuth
  }

  input CreateChatRecordInput {
    sourceId: Int!
    targetId: Int!
    message: String!
    timeStamp: DateTime!
    conversationId: Int!
  }

  input UpdateChatRecordInput {
    sourceId: Int
    targetId: Int
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
