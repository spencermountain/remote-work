import * as cheerio from 'cheerio';

const parseNginx = function (html) {
  var $ = cheerio.load(html);
  let res = null
  return res
}

// see example at http://us.archive.ubuntu.com/ubuntu/pool/multiverse/y/
const parseApache = function (html) {
  var $ = cheerio.load(html);
  let files = []
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
    files.push({ href, name })
  })
  return files
}

export default { nginx: parseNginx, apache: parseApache }