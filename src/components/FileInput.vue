<template>
  <div
    id="holder"
    v-on:drop="onFileDrop"
    v-on:dragover="onFileDragOver"
    v-if="file == null"
    class="bg-gray-200 p-8 rounded-lg mx-8"
  >
    <h2 class="text-center text-xl mb-2">Add an app to get started</h2>
    <h5 class="text-center text-gray-600">
      You can drag files with the .aab extension or click to add one
    </h5>
  </div>
  <div v-else class="bg-white p-4 rounded-lg mx-8 shadow">
    <div class="flex justify-between">
      <h2>{{ file.name }}</h2>
      <img
        alt="Vue logo"
        src="../assets/close.png"
        width="25"
        height="5"
        class="cursor-pointer"
        v-on:click="clearFile"
      />
    </div>
    <h5 class="text-gray-600 text-sm">
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
      console.log('File(s) you dropped here: ', this.file)
    },
    onFileDragOver: (e) => {
      e.preventDefault()
      e.stopPropagation()
    },
    clearFile: function() {
      this.file = null
    },
  },
}
</script>
