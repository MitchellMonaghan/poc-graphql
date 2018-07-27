import Vue from 'vue'
import Vuex from 'vuex'

import bookStore from './bookStore'
import authorStore from './authorStore'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      bookStore,
      authorStore
    }
  })

  return Store
}
