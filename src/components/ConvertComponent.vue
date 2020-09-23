<template>
  <!--
    Gives the user a view to select how to sign the apk. There are two options, using the debug keystore or using a custom one.
    In the instance the selected choice is the latter one, the component provides the user with a form to provide the keystore, password and alias.
  -->
  <div class="bg-white p-4 rounded-lg shadow-sm m-8 max-w-md">
    <h2 class="mb-2 text-sm text-gray-600">
      By default the application is signed with the default debug keystore
    </h2>
    <input
      type="radio"
      id="age3"
      name="signApk"
      checked="!signApk"
      v-bind:value="false"
      v-model="signApk"
    />
    <label for="age2" class="ml-4">Use debug keystore</label><br />
    <input
      type="radio"
      id="age3"
      name="signApk"
      checked="signApk"
      v-bind:value="true"
      v-model="signApk"
    />
    <label for="age2" class="ml-4">Use custom keystore</label><br />

    <button
      v-if="file.file && !signApk"
      v-on:click="convertToApk"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
    >
      Convert to APK
    </button>

    <template v-if="signApk">
      <h2 class="mt-6">Keystore details</h2>
      <form @submit.prevent>
        <div class="w-full mt-2">
          <label
            class="text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >
            Keystore
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="file"
            required="signApk"
            v-on:change="onFileChange"
            placeholder="/path/to/keystore"
          />
        </div>
        <div class="w-full mt-2">
          <label
            class="text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >
            Keystore password
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="password"
            required="signApk"
            placeholder="··········"
            v-model="keystoreDetails.keystorePassword"
          />
        </div>
        <div class="w-full mt-2">
          <label
            class="text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >
            Key alias
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Alias"
            required="signApk"
            v-model="keystoreDetails.keyAlias"
          />
        </div>
        <div class="w-full mt-2">
          <label
            class="text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >
            Key password
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="password"
            placeholder="··········"
            required="signApk"
            v-model="keystoreDetails.keyPassword"
          />
        </div>
        <button
          type="submit"
          v-on:click="validateForm"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
        >
          Convert to APK
        </button>
      </form>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { remote } from 'electron'

import { createFileInTemp } from '@/service/file.js'
import { convert } from '@/service/convert.js'

export default {
  name: 'ConvertComponent',
  data() {
    return {
      signApk: false,
      keystoreDetails: {
        keyAlias: null,
        keyPassword: null,
        keystorePassword: null,
        keystore: null
      }
    }
  },
  computed: {
    ...mapState(['file', 'app'])
  },
  methods: {
    validateForm: function() {
      const {
        keyAlias,
        keyPassword,
        keystorePassword,
        keystore
      } = this.keystoreDetails
      if (!keyAlias || !keyPassword || !keystorePassword || !keystore) {
        return
      } else {
        this.convertToApk()
      }
    },
    convertToApk: async function() {
      createFileInTemp(this.app.workingDirectory, this.file.file)
      convert(
        this.app.workingDirectory,
        this.app.bundletoolPath,
        this.file.file,
        this.signApk,

        remote.app.getPath('home')
      )
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.keystoreDetails.keystore = files[0]
    }
  }
}
</script>
