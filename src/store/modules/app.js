import path from 'path'
import fs from 'fs'

export const namespaced = true

export const state = {
  sessionId: null,
  workingDirectory: null,
  bundletoolPath: null,
  bundletoolExists: false
}

export const mutations = {
  CREATE_SESSION_ID(state, sessionId) {
    state.sessionId = sessionId
  },
  CREATE_WORKING_DIRECTORY(state, workingDirectory) {
    state.workingDirectory = workingDirectory
  },
  CREATE_BUNDLETOOL_PATH(state, bundletoolPath) {
    state.bundletoolPath = bundletoolPath
  },
  UPDATE_IF_BUNDLETOOL_EXISTS(state, bundletoolExists) {
    state.bundletoolExists = bundletoolExists
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
  },
  createBundletoolPath({ commit, dispatch }, tempDirectory) {
    const bundletoolPath = path.join(
      tempDirectory,
      'bundletool',
      'bundletool-all-1.0.0.jar'
    )
    commit('CREATE_BUNDLETOOL_PATH', bundletoolPath)
    dispatch('checkIfBundletoolExists')
  },
  checkIfBundletoolExists({ commit }) {
    commit('UPDATE_IF_BUNDLETOOL_EXISTS', fs.existsSync(state.bundletoolPath))
  }
}

export const modules = {}

export const getters = {}
