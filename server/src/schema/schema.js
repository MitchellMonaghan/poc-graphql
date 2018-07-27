import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,

  GraphQLSchema
} from 'graphql'

// import { find, filter } from 'lodash'

import Book from '@models/book'
import Author from '@models/author'

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve (parent, args) {
        // return find(authors, { id: parent.authorId })
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        // return filter(books, { authorId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        // return books
      }
    },

    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve (parent, args) {
        // code to get data from db/other source
        // return find(books, { id: args.id })
      }
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve (parent, args) {
        // return authors
      }
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve (parent, args) {
        // return find(authors, { id: args.id })
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID }
      },
      resolve (parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.addAuthor
        })

        return book.save()
      }
    },

    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve (parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age
        })

        return author.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
