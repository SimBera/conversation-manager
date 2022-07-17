export const schema = gql`
  type UserConversation {
    id: Int!
    userId: Int!
    conversationId: Int!
    user: User!
    conversation: Conversation!
  }

  type Query {
    userConversations: [UserConversation!]! @skipAuth
    userConversation(id: Int!): UserConversation @skipAuth
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
    ): UserConversation! @skipAuth
    updateUserConversation(
      id: Int!
      input: UpdateUserConversationInput!
    ): UserConversation! @skipAuth
    deleteUserConversation(id: Int!): UserConversation! @skipAuth
  }
`
