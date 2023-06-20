const knownServer = function (req, doc) {
  let server = req.headers.get('server')
  if (server) {
    if (server.match(/nginx/i)) {
      return 'nginx'
    }
    if (server.match(/apache/i)) {
      return 'apache'
    }
  }
  return null
}
export default knownServer