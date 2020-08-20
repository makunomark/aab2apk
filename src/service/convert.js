import path from 'path'
import util from 'util'

const exec = util.promisify(require('child_process').exec)

/**
 * Converts the input apk file to an aab file.
 *
 * @param {String} workingDirectory obtain this value from the store
 * @param {String} bundletoolPath obtain this value from the store
 * @param {File} file the apk file. obtain this value from the store
 * @param {Boolean} signApk a boolean if the generated aab should be signed
 * @param {String} homePath the computers home path. Used to access the Android SDK for the aapt component
 */
const convert = async (
  workingDirectory,
  bundletoolPath,
  file,
  signApk,
  homePath
) => {
  const aabFilePath = path.join(workingDirectory, file.name)

  const fileNameMinusExt = path.basename(aabFilePath, '.aab')

  const apksFilePath = path.join(workingDirectory, fileNameMinusExt)

  var convertAabToApk = `java -jar "${bundletoolPath}" build-apks --bundle="${aabFilePath}" --output="${apksFilePath}.apks" --mode=universal`

  if (signApk) {
    convertAabToApk += ` --ks=${this.keystoreDetails.keystore.path} --ks-pass=pass:${this.keystoreDetails.keystorePassword} --ks-key-alias=${this.keystoreDetails.keyAlias} --key-pass=pass:${this.keystoreDetails.keyPassword}`
  }

  const renameApksToZip = `mv "${apksFilePath}.apks" "${apksFilePath}.zip"`

  const unzip = `unzip "${apksFilePath}.zip" -d "${apksFilePath}"`

  const universalApkPath = path.join(apksFilePath, 'universal.apk')

  const defaultAaptPath = path.join(
    homePath,
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
}

export { convert }
