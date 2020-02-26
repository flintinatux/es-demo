const { curry } = require('tinyfunk')

const { getHost, getProto } = require('./parseRequest')

const resolveUri = (pathName, { req }) => {
  const origin = req
    ? `${getProto(req)}://${getHost(req)}`
    : global.location.origin

  return origin + pathName
}

module.exports = curry(resolveUri)
