<template>
  <!-- 
  A component that allows the user to:
    1. download the bundle tool
    2. Drag and drop the downloaded .jar file into it
    3. Store a copy of the file 
  -->
  <div
    class="my-8 py-8 flex flex-col justify-center bg-gray-200 p-8 rounded-lg mx-8 max-w-md"
  >
    <div
      v-if="downloadBundletoolStarted == false"
      class="flex flex-col items-center"
    >
      <img
        alt="Jar file format"
        src="@/assets/download.svg"
        width="80"
        class="self-center"
      />
      <p class="my-4 text-center">
        We couldn't find one of the dependencies of aab2apk.
      </p>
      <p class="text-center mt-4 text-sm text-gray-600">
        aab2apk needs bundle-tool-1.0.0.jar to work.
      </p>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        v-on:click="downloadBundletool"
      >
        Download bundletool-1.0.0.jar
      </button>
    </div>
    <div
      v-else
      class="flex flex-col"
      v-on:drop="onFileDrop"
      v-on:dragover="onFileDragOver"
    >
      <img
        alt="Jar file format"
        src="@/assets/files-and-folders.svg"
        width="80"
        class="self-center"
      />
      <p class="my-4 text-center">
        Once download is complete, please drag and drop the file here.
      </p>
      <p class="text-center mt-4 text-sm text-gray-600">
        bundletool-1.0.0.jar download has been started on your browser.
      </p>
      <a
        class="text-blue-500 cursor-pointer hover:underline mt-1 text-center text-sm"
        v-on:click="downloadBundletool"
      >
        Retry download
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { shell } from 'electron'
import path from 'path'
import store from '@/store'

import { createFileInTemp } from '@/service/file.js'

export default {
  name: 'BundleToolComponent',
  data() {
    return {
      downloadBundletoolStarted: false,
      downloadedFile: null
    }
  },
  computed: {
    ...mapState(['file', 'app'])
  },
  methods: {
    onFileDrop: function(e) {
      e.preventDefault()
      e.stopPropagation()

      if (e.dataTransfer.files.length > 1) {
        console.log('Error: We can only take 1 file. Taking the first file')
      }

      const file = e.dataTransfer.files[0]
      if (!/\.(jar)$/i.test(file.name)) {
        this.showFileNotAabError()
        this.clearFile()
      } else {
        const dirname = path.dirname(this.$store.state.app.bundletoolPath)
        createFileInTemp(dirname, file)
        store.dispatch('app/checkIfBundletoolExists')
      }
    },
    onFileDragOver: e => {
      e.preventDefault()
      e.stopPropagation()
    },
    clearFile: function() {
      this.downloadedFile = null
    },
    downloadBundletool: function() {
      this.downloadBundletoolStarted = true
      shell.openExternal(
        'https://github.com/google/bundletool/releases/download/1.0.0/bundletool-all-1.0.0.jar'
      )
    }
  }
}
</script>
