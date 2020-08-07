<template>
  <div id="app" class="bg-gray-100 h-screen flex items-center flex-col">
    <div class="my-4">
      <img alt="Vue logo" src="./assets/logo.png" width="80" />
    </div>
    <FileInput />
    <button
      v-if="file.file"
      v-on:click="createCopy"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
    >
      Copy file
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { remote } from 'electron'
import { v4 as uuidv4 } from 'uuid'

import FileInput from './components/FileInput.vue'
import { createFileInTemp } from '@/service/file.js'
import store from '@/store'

export default {
  name: 'App',
  components: {
    FileInput
  },
  data() {
    return {
      sessionId: this.$store.state.sessionId
    }
  },
  computed: {
    ...mapState(['file', 'app'])
  },
  created: function() {
    const tempDirectory = remote.app.getAppPath('temp')

    store.dispatch('app/createSessionId', uuidv4())
    store.dispatch('app/createWorkingDirectory', tempDirectory)
  },
  methods: {
    createCopy: function() {
      createFileInTemp(this.app.workingDirectory, this.file.file)
    }
  }
}
</script>
