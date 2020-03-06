const { Consumer } = require('../../lib/messages')
const handlers = require('./handlers')

module.exports =
  Consumer({
    name: 'Identity',
    category: 'identity:command',
    handlers
  })
