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
    // const response = await this._vm.$apollo.query({});
    console.log(book)
  },

  async fetchBooks ({ commit }) {
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
      `
    })

    commit('setBooks', response.data.books)
  }
})

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
