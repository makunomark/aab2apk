<template>
  <div id="app" class="bg-gray-100 h-screen">
    <div class="flex justify-center my-4">
      <img alt="Vue logo" src="./assets/logo.png" width="80" />
    </div>
    <FileInput />
  </div>
</template>

<script>
import FileInput from './components/FileInput.vue'

export default {
  name: 'App',
  components: {
    FileInput,
  },
}
</script>
