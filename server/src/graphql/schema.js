import gql from 'graphql-tag'

export default gql`
  type Query {
    login(username: String!, password: String!): String!

    books: [Book]
    book(id: ID!): Book

    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    "Mutation used for creating users"
    createUser(firstName: String, lastName: String, username: String, email: String!, password: String!): User
    updateUser(firstName: String, lastName: String, email: String!, password: String!): User
    deleteUser(firstName: String, lastName: String, email: String!, password: String!): User

    addBook(name: String!, genre: String!, authorId: ID!): Book
    addAuthor(name: String!, age: Int!): Author
  }

  type Subscription {
    newBook: Book!
  }

  "A type that desribes a User"
  type User {
    id: ID!
    firstName: String
    lastName: String
    username: String!
    email: String!
    permissions: [Permission]
  }

  type Permission {
    resource: String
    action: String
  }

  type Book {
    id: ID!
    name: String!
    genre: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    age: Int!
    books: [Book]
  }
`
