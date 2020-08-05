<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
