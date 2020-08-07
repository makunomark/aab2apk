import path from 'path'

export const namespaced = true

export const state = {
  sessionId: null,
  workingDirectory: null
}

export const mutations = {
  CREATE_SESSION_ID(state, sessionId) {
    state.sessionId = sessionId
  },
  CREATE_WORKING_DIRECTORY(state, workingDirectory) {
    state.workingDirectory = workingDirectory
  }
}

export const actions = {
  createSessionId({ commit }, sessionId) {
    commit('CREATE_SESSION_ID', sessionId)
  },
  createWorkingDirectory({ commit, state }, tempDirectory) {
    const destinationDirectory = path.join(
      tempDirectory,
      '.tmp',
      state.sessionId
    )
    commit('CREATE_WORKING_DIRECTORY', destinationDirectory)
  }
}

export const modules = {}

export const getters = {}
