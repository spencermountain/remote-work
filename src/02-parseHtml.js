import * as cheerio from 'cheerio'
const isDir = /\/$/
const isFile = /\..{2,4}$/

const parseNginx = function (html) {
  let files = []
  let dirs = []
  var $ = cheerio.load(html)
  let rows = $('body pre a')
  rows.each(function () {
    let link = $(this)
    let href = link.attr('href')
    let name = link.text()
    if (isDir.test(href) && !isFile.test(href)) {
      dirs.push({ href, name })
    } else {
      files.push({ href, name })
    }
  })
  files = files.filter(o => o.href !== '../')
  return { files, dirs }
}

// see example at http://us.archive.ubuntu.com/ubuntu/pool/multiverse/y/
const parseApache = function (html) {
  var $ = cheerio.load(html)
  let files = []
  let dirs = []
  let rows = $('body table:first tbody tr')
  rows.each(function () {
    let row = $(this)
    // make sure it's not a header
    if (row.find('th').length) {
      return
    }
    // back row
    let img = row.find('img')
    if (img.attr('src') === '/icons/back.gif' || img.attr('alt') === '[PARENTDIR]') {
      return
    }
    // get the link
    let link = row.find('a')
    let href = link.attr('href')
    let name = link.text()
    // english-only check
    if (name === 'Parent Directory') {
      return
    }
    // file or directory
    if (isDir.test(href) && !isFile.test(href)) {
      dirs.push({ href, name })
    } else {
      files.push({ href, name })
    }
  })
  return { files, dirs }
}

export default { nginx: parseNginx, apache: parseApache }
