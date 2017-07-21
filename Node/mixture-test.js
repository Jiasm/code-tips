const mixture = require('./mixture.js')
const path = require('path');
const fs = require('fs');

const writeFile = mixture(fs.writeFile)
const [mkdir, unlink] = mixture([fs.mkdir, fs.unlink])
const [readFile, stat] = mixture(fs.readFile, fs.stat)

async function app () {
  let testFolder = path.resolve(__dirname, './test')
  let testFile = path.resolve(testFolder, 'test.md')

  if (!fs.existsSync(testFolder)) {
    await mkdir(testFolder)
  }

  if (fs.existsSync(testFile)) {
    await unlink(testFile)
  }
  await writeFile(testFile, 'Hello World')
  let fileStat = await stat(testFile)

  console.log('file stat:', fileStat)

  let text = await readFile(testFile)

  console.log('file text:', text.toString())
}

app()
