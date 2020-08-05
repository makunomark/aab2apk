<template>
  <div
    id="holder"
    v-on:drop="onFileDrop"
    v-on:dragover="onFileDragOver"
    v-if="file == null"
  >
    <h2>Add an app to get started</h2>
    <h5>You can drag files with the .aab extension or click to add one</h5>
  </div>
  <div v-else>
    <h2>{{ file.name }}</h2>
    <h5>
      <span>{{ file.size | formatSize }} · {{ file.lastModifiedDate }}</span>
    </h5>
    <hr />
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
  },
}
</script>
