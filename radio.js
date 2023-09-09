import remote from './src/index.js'

const out = '/Volumes/4TB/old-radio/Q Series'
let res = await remote('https://the-eye.eu/public/Radio/otrr.org/Library%20Files/Q%20Series/', out)
console.log(res)
