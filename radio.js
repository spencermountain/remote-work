import remote from './src/index.js'
import fs from 'fs'

const letter = 'K'

const dir = `/Volumes/4TB/old-radio/${letter} Series`
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
let res = await remote(`https://the-eye.eu/public/Radio/otrr.org/Library%20Files/${letter}%20Series/`, dir)
console.log(res)
