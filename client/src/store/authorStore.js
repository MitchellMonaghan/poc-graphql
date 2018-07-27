import { extend } from 'quasar'
import gql from 'graphql-tag'

const state = extend({}, {
  authors: []
})

const mutations = extend({}, {
  setAuthors (state, authors) {
    state.authors = authors
  }
})

const actions = extend({}, {
  async fetchAuthors ({ commit }) {
    const response = await this._vm.$apollo.query({
      query: gql`
        query authors {
          authors {
            id
            name
            age
            books{
              name
              genre
            }
          }
        }
      `
    })

    commit('setAuthors', response.data.authors)
  }
})

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
