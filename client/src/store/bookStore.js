import { extend } from 'quasar'
import gql from 'graphql-tag'

let booksSubscriptionObserver

const state = extend({}, {
  books: []
})

const mutations = extend({}, {
  addBook (state, book) {
    state.books.push(book)
  },

  setBooks (state, books) {
    state.books = books
  }
})

const actions = extend({}, {
  async addBook ({ commit }, book) {
    try {
      await this._vm.$apollo.mutate({
        variables: book,
        mutation: gql`
          mutation($name: String!, $genre: String!, $authorId: ID!) {
            addBook(name: $name, genre: $genre, authorId: $authorId) {
              name
              id
            }
          }
        `
      })

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async fetchBooks ({ commit }) {
    try {
      const response = await this._vm.$apollo.query({
        query: gql`
          query books {
            books {
              id
              name
              genre
              author{
                name
                age
              }
            }
          }
        `,
        fetchPolicy: 'no-cache'
      })

      commit('setBooks', extend(true, [], response.data.books))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },

  subscribeToBooks (context) {
    const booksSubscriptionObservable = this._vm.$apollo.subscribe({
      query: gql`
        subscription {
          newBook {
            name
          }
        }
      `
    })

    booksSubscriptionObserver = booksSubscriptionObservable.subscribe({
      next ({data}) {
        if (data.newBook) {
          context.commit('addBook', data.newBook)
        } else if (data.updatedBook) {

        } else if (data.deletedBook) {

        }
      },
      error (error) {
        console.log(error)
      }
    })
  },

  unsubscribeFromBooks (context) {
    if (booksSubscriptionObserver) {
      booksSubscriptionObserver.unsubscribe()
      booksSubscriptionObserver = null
    }
  }
})

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
