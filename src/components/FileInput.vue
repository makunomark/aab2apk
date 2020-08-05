<template>
  <div>
    <template v-if="files.length == 0">
      <h2>Add an app to get started</h2>
      <h5>You can drag files with the .aab extension or click to add one</h5>
      <file-upload
        accept=".aab"
        extensions=".aab"
        :drop="true"
        :value="files"
        @input="updatetValue"
        @input-filter="inputFilter"
      >
        Upload file
      </file-upload>
    </template>
    <template v-else>
      <div>
        <p>{{ files[0].name }}</p>
        <p>{{ files[0].size | formatSize }}</p>
        <p>{{ files[0].lastModified }}</p>
      </div>
    </template>
  </div>
</template>

<script>
import VueUploadComponent from 'vue-upload-component'

export default {
  name: 'FileInput',
  components: {
    'file-upload': VueUploadComponent,
  },
  data() {
    return {
      files: [],
    }
  },
  methods: {
    updatetValue(value) {
      this.files = value
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Add file

        // Filter non-image file
        // Will not be added to files
        if (!/\.(aab)$/i.test(newFile.name)) {
          return prevent()
        }
      }
    },
  },
}
</script>
