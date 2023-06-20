import remote from './src/index.js'

let res = await remote('http://us.archive.ubuntu.com/ubuntu/pool/multiverse/y')
// let res = await remote('http://65.186.78.52/MUSIC/RHAPSODY/D/Dolly%20Parton/')
// let res = await remote('https://the-eye.eu/public/Books/World%20Tracker%20Library/worldtracker.org/media/library/')
console.log(res)