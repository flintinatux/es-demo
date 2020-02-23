const uuid = require('uuid/v4')

const trace = f => (req, res) => {
  req.meta = req.meta || {}
  req.meta.traceId = uuid()
  return f(req, res)
}

module.exports = trace
