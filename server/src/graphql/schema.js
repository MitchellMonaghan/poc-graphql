import gql from 'graphql-tag'

export default gql`
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

  type Query {
    books: [Book]
    book(id: ID!): Book

    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    addBook(name: String!, genre: String!, authorId: ID!): Book
    addAuthor(name: String!, age: Int!): Author
  }

  type Subscription {
    newBook: Book!
  }
`
