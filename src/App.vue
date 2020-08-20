<template>
  <div
    id="app"
    class="bg-gray-100 h-full min-h-screen flex items-center flex-col pb-4"
  >
    <div class="my-4">
      <img alt="Vue logo" src="./assets/logo.png" width="80" />
    </div>

    <template v-if="!app.bundletoolExists">
      <BundleToolComponent />
    </template>

    <template v-if="app.bundletoolExists">
      <FileInputComponent />
    </template>

    <template v-if="app.bundletoolExists && file.file">
      <ConvertComponent />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { remote } from 'electron'
import { v4 as uuidv4 } from 'uuid'

import FileInputComponent from '@/components/FileInputComponent.vue'
import BundleToolComponent from '@/components/BundleToolComponent.vue'
import ConvertComponent from '@/components/ConvertComponent.vue'

import store from '@/store'

export default {
  name: 'App',
  components: {
    FileInputComponent,
    BundleToolComponent,
    ConvertComponent
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
    const tempDirectory = remote.app.getPath('userData')

    store.dispatch('app/createSessionId', uuidv4())
    store.dispatch('app/createWorkingDirectory', tempDirectory)
    store.dispatch('app/createBundletoolPath', tempDirectory)
  }
}
</script>
