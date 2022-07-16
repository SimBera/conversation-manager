export const schema = gql`
  type Conversation {
    id: Int!
    userId: Int!
  }

  type Query {
    conversations: [Conversation!]! @requireAuth
    conversation(id: Int!): Conversation @requireAuth
  }

  input CreateConversationInput {
    userId: Int!
  }

  input UpdateConversationInput {
    userId: Int
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
