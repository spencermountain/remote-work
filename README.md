# remote-work
a tool to crawl and download files from an open-directory.

this is a **work in progress!**

---
Sometimes you'll open a webpage, and it will look like this:
![2023-06-20-2trmhOpU](https://github.com/spencermountain/remote-work/assets/399657/0849ff32-d9f6-4776-a7d3-dd02ba6bc1c5)

This is called an `open directory`, or sometimes an `autoindexer`. It's a server that's configured to show you all its files, which is nice. It was more common in earlier days.

This is a tool to download the all files from a page like this.

```
npx remote-work http://us.archive.ubuntu.com/ubuntu/pool/multiverse/y
```
(you'll need to have [nodejs installed](https://nodejs.dev/en/download/))

### Features
* **fast** - downloads files 3 at a time, by default
* **configurable** - download only the files you'd like using a glob
* **resumable** - gets files *[depth-first](https://www.codecademy.com/article/tree-traversal)*
* **efficient** - don't re-download files that you already have

### Node API
you can also use this library in a script
`npm install remote-work`

```js
import remoteWork from 'remote-work'

let opts = {
  n: 1, //only download one file at a time
  match: '*.mp3' //only down
}
await remoteWork('http://us.archive.ubuntu.com/ubuntu/pool/multiverse/y', opts)

```

Please be considerate when downloading files from a remote server.

### See also
* [wget-wizard](https://www.whatismybrowser.com/developers/tools/wget-wizard/) - do it all w/ a CLI script
* [reddit.com/r/opendirectories](http://reddit.com/r/opendirectories)
* [directory_downloader](https://github.com/SuperVegetoo/directory_downloader) - python directory parser/crawler
* [autoindex](https://github.com/weisjohn/autoindex) javascript open directory parser by John Weis

MIT

