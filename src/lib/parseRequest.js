const getHost = req =>
  req.headers['x-forwarded-host'] || req.headers.host

const getProto = req =>
  req.headers['x-forwarded-proto'] ||
  (req.connection.encrypted ? 'https' : 'http')

module.exports = {
  getHost,
  getProto
}
