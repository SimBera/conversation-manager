export const schema = gql`
  type Conversation {
    id: Int!
    title: String
    UserConversation: [UserConversation]!
    ChatRecord: [ChatRecord]!
  }

  type Query {
    conversations: [Conversation!]! @requireAuth
    conversation(id: Int!): Conversation @requireAuth
  }

  input CreateConversationInput {
    title: String
  }

  input UpdateConversationInput {
    title: String
  }

  type Mutation {
    createConversation(input: CreateConversationInput!): Conversation!
      @requireAuth
    updateConversation(
      id: Int!
      input: UpdateConversationInput!
    ): Conversation! @requireAuth
    deleteConversation(id: Int!): Conversation! @requireAuth
  }
`
