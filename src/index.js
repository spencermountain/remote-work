/* eslint-disable no-console, no-unused-vars */
import fetch from 'node-fetch';
import knownServer from './01-knownServer.js'
import parsers from './02-parseHtml.js'


const remoteWork = async function (url, opts) {
  let req = await fetch(url)
  let html = await req.text()

  // is it a know open-directory page?
  let server = knownServer(req)
  if (!server) {
    console.error(`remote-work error: '${url}' is not a known open-directory format.`)
    return null
  }

  // parse the files from the html
  let files = parsers[server](html)
  if (!files || !files.length) {
    console.error(`remote-work error: Found no files to download at '${url}'`)
    return null
  }

  // filter down any files
  console.log(files)
  return files
}
export default remoteWork