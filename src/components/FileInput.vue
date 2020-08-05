<template>
  <div
    id="holder"
    v-on:drop="onFileDrop"
    v-on:dragover="onFileDragOver"
    v-if="file == null"
    class="bg-gray-200 p-8 rounded-lg mx-8 max-w-md"
  >
    <h2 class="text-center text-xl mb-2">Add an app to get started</h2>
    <h5 class="text-center text-gray-600">
      You can drag files with the .aab extension or click to add one
    </h5>
    <p
      class="text-center text-red-500 w-auto rounded-lg mt-4"
      v-if="fileNotAab == true"
    >
      Error: Only .aab file types allowed
    </p>
  </div>
  <div v-else class="bg-white p-4 rounded-lg mx-8 shadow flex flex-col">
    <img
      alt="Vue logo"
      src="../assets/close.png"
      width="18"
      height="6"
      class="cursor-pointer self-end"
      v-on:click="clearFile"
    />
    <h2 class="flex-1">{{ file.name }}</h2>
    <h5 class="text-gray-600 text-sm mt-2">
      {{ file.size | formatSize }} · {{ file.lastModifiedDate }}
    </h5>
  </div>
</template>

<script>
export default {
  name: 'FileInput',
  data() {
    return {
      file: null,
      fileNotAab: false,
    }
  },
  methods: {
    onFileDrop: function(e) {
      e.preventDefault()
      e.stopPropagation()

      if (e.dataTransfer.files.length > 1) {
        console.log('Error: We can only take 1 file. Taking the first file')
      }

      this.file = e.dataTransfer.files[0]
      if (!/\.(aab)$/i.test(this.file.name)) {
        this.showFileNotAabError()
        this.clearFile()
      } else {
        console.log('File(s) you dropped here: ', this.file)
      }
    },
    onFileDragOver: (e) => {
      e.preventDefault()
      e.stopPropagation()
    },
    clearFile: function() {
      this.file = null
    },
    showFileNotAabError: function() {
      this.fileNotAab = true
      setTimeout(() => {
        this.fileNotAab = false
      }, 3000)
    },
  },
}
</script>
