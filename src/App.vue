<template>
  <div
    id="app"
    class="bg-gray-100 h-full min-h-screen flex items-center flex-col pb-4"
  >
    <div class="my-4">
      <img alt="Vue logo" src="./assets/logo.png" width="80" />
    </div>

    <template v-if="app.bundletoolExists">
      <FileInput />
    </template>

    <template v-else>
      <BundleToolDownloader />
    </template>

    <div
      v-if="file.file"
      class="bg-white p-4 rounded-lg shadow-sm m-8 max-w-md"
    >
      <h2 class="mb-2 text-sm text-gray-600">
        By default the application is signed with the debug keystore located at
        /asdad/asdads/asda.jks
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { remote } from 'electron'
import { v4 as uuidv4 } from 'uuid'
import util from 'util'
import path from 'path'

import FileInput from '@/components/FileInput.vue'
import BundleToolDownloader from '@/components/BundleToolDownloader.vue'

import { createFileInTemp } from '@/service/file.js'
import store from '@/store'

const exec = util.promisify(require('child_process').exec)

export default {
  name: 'App',
  components: {
    FileInput,
    BundleToolDownloader
  },
  data() {
    return {
      sessionId: this.$store.state.sessionId,
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
  created: function() {
    const tempDirectory = remote.app.getPath('userData')

    store.dispatch('app/createSessionId', uuidv4())
    store.dispatch('app/createWorkingDirectory', tempDirectory)
    store.dispatch('app/createBundletoolPath', tempDirectory)
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

      const aabFilePath = path.join(
        this.app.workingDirectory,
        this.file.file.name
      )

      const fileNameMinusExt = path.basename(aabFilePath, '.aab')

      const apksFilePath = path.join(
        this.app.workingDirectory,
        fileNameMinusExt
      )

      var convertAabToApk = `java -jar "${this.app.bundletoolPath}" build-apks --bundle="${aabFilePath}" --output="${apksFilePath}.apks" --mode=universal`

      if (this.signApk) {
        convertAabToApk += ` --ks=${this.keystoreDetails.keystore.path} --ks-pass=pass:${this.keystoreDetails.keystorePassword} --ks-key-alias=${this.keystoreDetails.keyAlias} --key-pass=pass:${this.keystoreDetails.keyPassword}`
      }

      const renameApksToZip = `mv "${apksFilePath}.apks" "${apksFilePath}.zip"`

      const unzip = `unzip "${apksFilePath}.zip" -d "${apksFilePath}"`

      const universalApkPath = path.join(apksFilePath, 'universal.apk')

      const defaultAaptPath = path.join(
        remote.app.getPath('home'),
        'Library',
        'Android',
        'sdk',
        'build-tools',
        '30.0.0',
        'aapt'
      )

      const getAppVersion = `${defaultAaptPath} dump badging "${universalApkPath}" | grep "versionName" | sed -e "s/.*versionName='//" -e "s/' .*//" | pbcopy`

      const renameFile = `mv "${universalApkPath}" "${apksFilePath}/${fileNameMinusExt}-v$(pbpaste).apk"`

      const openFinder = `open "${apksFilePath}"`

      // const finalCommand = `${convertAabToApk} && ${renameApksToZip} && ${unzip} && ${getAppVersion} && ${renameFile} && ${openFinder}`

      const commandArray = []
      commandArray.push(convertAabToApk)
      commandArray.push(renameApksToZip)
      commandArray.push(unzip)
      commandArray.push(getAppVersion)
      commandArray.push(renameFile)
      commandArray.push(openFinder)

      for (let i = 0; i < commandArray.length; i++) {
        const command = commandArray[i]
        console.log(command)
        const { stdout, stderr } = await exec(command)
        if (stderr) {
          console.log(`stderr: ${stderr}`)
        }
        if (stdout) {
          console.log(`stdout: ${stdout}`)
        }
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.keystoreDetails.keystore = files[0]
    }
  }
}
</script>
