/* eslint-disable no-console, no-unused-vars */
import fetch from 'node-fetch'
import knownServer from './01-knownServer.js'
import parsers from './02-parseHtml.js'
import wget from './_wget.js'
import { URL } from 'url'
import path from 'path'

const getPage = async function (url) {
  let req = await fetch(url)
  let html = await req.text()
  let res = { files: [], dirs: [] }

  // is it a know open-directory page?
  let server = knownServer(req)
  if (!server) {
    console.error(`remote-work error: '${url}' is not a known open-directory format.`)
    return res
  }

  // parse the files from the html
  res = parsers[server](html)
  if (!res.files.length && !res.dirs.length) {
    console.error(`remote-work error: Found no files to download at '${url}'`)
    return res
  }
  // make them absolute links
  res.files.forEach((obj) => {
    obj.href = new URL(obj.href, url).href
  })
  res.dirs.forEach((obj) => {
    obj.href = new URL(obj.href, url).href
  })
  // filter down any files
  return res
}

// downloan any files
const getFiles = async function (res, dir) {
  console.log(`getting ${res.files.length} files`)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  for (let i = 0; i < res.files.length; i += 1) {
    let file = path.join(dir, res.files[i].name)
    await wget(res.files[i].href, file)
  }
}

const getDirs = async function (res) {
  console.log(`getting ${res.dirs.length} dirs`)
  for (let i = 0; i < res.dirs.length; i += 1) {
    let r = await getPage(res.dirs[i].href)
    console.log(`+ ${r.dirs.length} dirs, ${r.files.length} files`)
    res.files = res.files.concat(r.files)
    res.dirs = res.dirs.concat(r.dirs)
  }
  return res
}

const remoteWork = async function (url, dir, opts) {
  let res = await getPage(url)
  let times = 0
  while (res.files.length || res.dirs.length) {
    console.log('#' + times, res.dirs.length, res.files.length)
    await getFiles(res, dir)
    res.files = []

    await getDirs(res)
    res.dirs = []
    times += 1
  }
  return res
}
export default remoteWork
