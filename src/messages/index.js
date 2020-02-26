const { mapObj, merge, thrush } = require('tinyfunk')

const api = require('./api')

// messages :: Object -> Object
const messages = opts => {
  const db = require('./db')(opts)
  return merge(mapObj(thrush(db), api), db)
}

module.exports = messages
