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
  createSessionId({ commit }) {
    commit('CREATE_SESSION_ID', '66a03da4-f100-4199-88a5-d53d80f7481c')
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
