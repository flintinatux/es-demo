const { Consumer } = require('../../lib/messages')
const handlers = require('./handlers')

module.exports =
  Consumer({
    name: 'UserSignup',
    category: 'userSignup:command',
    handlers
  })
