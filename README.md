<div align="center">
  <img height="15px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
  <div><b>remote-work</b></div>
  <img src="https://user-images.githubusercontent.com/399657/68222691-6597f180-ffb9-11e9-8a32-a7f38aa8bded.png"/>
  <div>crawl and download files from an open-directory</div>
  <div><code>npm install remote-work</code></div>
  <img height="22px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

<div align="center">
  <div>
    <a href="https://npmjs.org/package/remote-work">
      <img src="https://img.shields.io/npm/v/remote-work.svg?style=flat-square" />
    </a>
  </div>
**work in progress!**
</div>

<!-- spacer -->
<img height="55px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

Sometimes you'll open a webpage, and it will look like this:
![2023-06-20-2trmhOpU](https://github.com/spencermountain/remote-work/assets/399657/0849ff32-d9f6-4776-a7d3-dd02ba6bc1c5)

This is called an **open directory**, or sometimes an **autoindexer**.

It's a server that's configured to show you all its files, which is nice. It used to be more common.

<!-- spacer -->
<img height="35px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

This is a tool to download the all files from a page like this, from the command-line.

```bash
npx remote-work http://us.archive.ubuntu.com/ubuntu/pool/multiverse/y
```

(you'll need to have [NodeJS installed](https://nodejs.dev/en/download/))

### Features

- **async** - downloads files 3 at a time, by default
- **configurable** - download only the files you'd like, using _a [glob](https://www.digitalocean.com/community/tools/glob)_
- **stoppable** - gets files _[depth-first](https://www.codecademy.com/article/tree-traversal)_
- **resumable** - don't re-download files that you already have

<!-- spacer -->
<img height="35px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Node API

you can also use this library in a script
`npm install remote-work`

```js
import remoteWork from 'remote-work'

const url = 'http://us.archive.ubuntu.com/ubuntu/pool/multiverse/y'
const dir = './output'
let opts = {
  n: 1, //only download one file at a time
  match: '*.mp3' //only download mp3 files
}
await remoteWork(url, dir, opts)
```

Please be considerate when downloading files from a remote server.

---

### See also

- [wget-wizard](https://www.whatismybrowser.com/developers/tools/wget-wizard/) - do it all w/ a CLI script
- [reddit.com/r/opendirectories](http://reddit.com/r/opendirectories)
- [directory_downloader](https://github.com/SuperVegetoo/directory_downloader) - python directory parser/crawler
- [autoindex](https://github.com/weisjohn/autoindex) javascript open directory parser by John Weis

MIT
