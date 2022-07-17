export const schema = gql`
  type UserConversation {
    id: Int!
    userId: Int!
    conversationId: Int!
    user: User!
    conversation: Conversation!
  }

  type Query {
    userConversations: [UserConversation!]! @requireAuth
    userConversation(id: Int!): UserConversation @requireAuth
  }

  input CreateUserConversationInput {
    userId: Int!
    conversationId: Int!
  }

  input UpdateUserConversationInput {
    userId: Int
    conversationId: Int
  }

  type Mutation {
    createUserConversation(
      input: CreateUserConversationInput!
    ): UserConversation! @requireAuth
    updateUserConversation(
      id: Int!
      input: UpdateUserConversationInput!
    ): UserConversation! @requireAuth
    deleteUserConversation(id: Int!): UserConversation! @requireAuth
  }
`
