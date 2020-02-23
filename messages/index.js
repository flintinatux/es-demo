const { mapObj, thrush } = require('tinyfunk')

const api = {
  writeMessage: require('./writeMessage')
}

const messages = opts => {
  const db = require('./db')(opts)
  return mapObj(thrush({ db }), api)
}

module.exports = messages
