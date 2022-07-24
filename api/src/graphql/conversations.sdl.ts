export const schema = gql`
  type Conversation {
    id: Int!
    title: String
    UserConversation: [UserConversation]!
    ChatRecord: [ChatRecord]!
  }

  type Query {
    conversations: [Conversation!]! @skipAuth
    conversation(id: Int!): Conversation @skipAuth
    getConversationsByUserId(userId: Int!): [Conversation!]! @skipAuth
  }

  input CreateConversationInput {
    title: String
    sourceUserId: Int!
    targetUserId: Int!
  }

  input UpdateConversationInput {
    title: String
  }

  type Mutation {
    createConversation(input: CreateConversationInput!): Conversation! @skipAuth
    updateConversation(
      id: Int!
      input: UpdateConversationInput!
    ): Conversation! @skipAuth
    deleteConversation(id: Int!): Conversation! @skipAuth
  }
`
