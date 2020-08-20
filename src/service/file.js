import path from 'path'
import fs from 'fs'

/**
 * Creates a copy of the file in the provided directory
 *
 * @param {String} destinationDirectory the directory that is to be used as the temp directory
 * @param {File} file the file to save
 */
const createFileInTemp = (destinationDirectory, file) => {
  if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory, { recursive: true })
  }

  const destinationFile = path.join(destinationDirectory, file.name)

  fs.copyFile(file.path, destinationFile, err => {
    if (err) throw err
  })
}

export { createFileInTemp }
