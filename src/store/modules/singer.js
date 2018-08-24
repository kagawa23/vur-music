import { SET_SINGER } from '../mutation-types'

const state = { singer: {} }

const getters = {
  singer: state => state.singer
}

const mutations = {
  [SET_SINGER] (state, singer) {
    state.singer = singer
  }
}

export default {
  state,
  getters,
  mutations
}
