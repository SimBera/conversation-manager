export const schema = gql`
  type User {
    id: Int!
    username: String!
    hashedPassword: String!
    salt: String!
    role: String!
    imageUrl: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    UserConversation: [UserConversation]!
    ChatRecord: [ChatRecord]!
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: Int!): User @skipAuth
  }

  input CreateUserInput {
    username: String!
    hashedPassword: String!
    salt: String!
    role: String!
    imageUrl: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    username: String
    hashedPassword: String
    salt: String
    role: String
    imageUrl: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @skipAuth
    deleteUser(id: Int!): User! @skipAuth
  }
`
