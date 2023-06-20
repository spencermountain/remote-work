import { minimatch } from 'minimatch'

const filter = function (files, glob) {
  if (!glob || glob === '*') {
    return files
  }
  files = files.filter(minimatch.filter(glob, { matchBase: true }))
  return files
}
export default filter