import path from 'path'
import fs from 'fs'

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
