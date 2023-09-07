/* eslint-disable no-console, no-unused-vars */
import fetch from 'node-fetch'
import knownServer from './01-knownServer.js'
import parsers from './02-parseHtml.js'
import wget from './_wget.js'
import slow from 'slow'
import { URL } from 'url'
import path from 'path'
import fs from 'fs'

const getPage = async function (url, dir) {
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
    obj.local = path.join(dir, obj.name)
    obj.dir = dir
  })
  res.dirs.forEach((obj) => {
    obj.href = new URL(obj.href, url).href
    obj.local = path.join(dir, obj.name)
  })
  // filter down any files
  return res
}

const getFile = async function (obj) {
  let { local, dir, href } = obj
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
    console.log('making: ' + dir)
  }
  await wget(href, local)
}

// downloan any files
const getFiles = async function (res) {
  console.log(`getting ${res.files.length} files`)
  await slow.walk(res.files, getFile)
}

const getDirs = async function (res) {
  console.log(`getting ${res.dirs.length} dirs`)
  for (let i = 0; i < res.dirs.length; i += 1) {
    let { href, local } = res.dirs[i]
    // add new data to res
    let r = await getPage(href, local)
    console.log(`+ ${r.dirs.length} dirs, ${r.files.length} files`)
    res.files = res.files.concat(r.files)
    res.dirs = res.dirs.concat(r.dirs)
  }
  return res
}

const remoteWork = async function (url, dir, opts) {
  let res = await getPage(url, dir)
  let times = 0
  while (res.files.length || res.dirs.length) {
    // console.log('#' + times, res.dirs.length, res.files.length)
    await getFiles(res)
    res.files = []

    await getDirs(res)
    res.dirs = []
    times += 1
  }
  return res
}
export default remoteWork
