import Book from '@models/book'
import Author from '@models/author'

import typeDefs from './schema'

const SUBSCRIPTION_EVENTS = {
  NEW_BOOK: 'NEW_BOOK'
}

const resolvers = {
  Query: {
    books (root, args, context, info) {
      return Book.find({})
    },

    book (root, args, context, info) {
      return Book.findById(args.id)
    },

    authors (root, args, context, info) {
      return Author.find({})
    },

    author (root, args, context, info) {
      return Author.findById(args.id)
    }
  },

  Mutation: {
    async addBook (parent, args, context) {
      const book = new Book({
        name: args.name,
        genre: args.genre,
        authorId: args.authorId
      })
      
      const newBook = await book.save()

      context.pubsub.publish(SUBSCRIPTION_EVENTS.NEW_BOOK, { mutation: 'ADD', newBook })

      return book
    },

    addAuthor (parent, args) {
      const author = new Author({
        name: args.name,
        age: args.age
      })

      return author.save()
    }
  },

  Subscription: {
    newBook: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator(SUBSCRIPTION_EVENTS.NEW_BOOK)
      }
    }
  },

  Book: {
    author (book) {
      return Author.findById(book.authorId)
    }
  },

  Author: {
    books (author) {
      return Book.find({ authorId: author.id })
    }
  }
}

export default { typeDefs, resolvers }
