import { extend } from 'quasar'
import gql from 'graphql-tag'

const state = extend({}, {
  books: []
})

const mutations = extend({}, {
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

      commit('setBooks', response.data.books)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
})

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
