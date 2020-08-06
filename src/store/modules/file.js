export const namespaced = true

export const state = {
  file: null
}

export const mutations = {
  ADD_FILE(state, file) {
    state.file = file
  },
  REMOVE_FILE(state) {
    state.file = null
  }
}

export const actions = {
  addFile({ commit }, file) {
    commit('ADD_FILE', file)
  },
  removeFile({ commit }) {
    commit('REMOVE_FILE')
  }
}

export const modules = {}

export const getters = {}
