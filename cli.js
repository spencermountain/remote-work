#!/usr/bin/env node
/* eslint-disable no-console, no-unused-vars */
import remoteWork from './src/index.js'
import minimist from 'minimist'

const defaults = {
  n: 3
}
const help = function () {
  console.log(`\n\n remote-work - download files from an open directory`)
  console.log(`\n    Usage:  \`npx remote-work http://example.com/files\``)
  console.log('\n\n')
}

const alias = {
  h: 'help',
  n: 'concurrent',
}

let opts = minimist(process.argv.slice(2), { alias: alias })
let url = opts._.join(' ').trim()
let dir = './'

if (!url || opts.help) {
  help()
  process.exit()
}

opts = Object.assign({}, defaults, opts)


let res = await remoteWork(url, dir, opts)
console.log(res)
console.log('done')
