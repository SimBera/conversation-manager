export const schema = gql`
  type Conversation {
    id: Int!
    UserConversation: [UserConversation]!
    ChatRecord: [ChatRecord]!
  }

  type Query {
    conversations: [Conversation!]! @requireAuth
    conversation(id: Int!): Conversation @requireAuth
  }

  input CreateConversationInput {
    
  }

  input UpdateConversationInput {
    
  }

  type Mutation {
    createConversation(input: CreateConversationInput!): Conversation! @requireAuth
    updateConversation(id: Int!, input: UpdateConversationInput!): Conversation! @requireAuth
    deleteConversation(id: Int!): Conversation! @requireAuth
  }
`
