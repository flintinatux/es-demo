const { assoc, merge } = require('tinyfunk')

const { Entity } = require('../../../lib/messages')

const init = {
  email: null,
  locked: false,
  registered: false,
  userId: null
}

const AccountLocked =
  assoc('locked', true)

const Registered = (entity, event) =>
  merge(entity, {
    email: event.data.email,
    registered: true,
    userId: event.data.userId
  })

const Identity =
  Entity({
    name: 'Identity',
    category: 'identity',
    init,
    handlers: {
      AccountLocked,
      Registered
    }
  })

module.exports = Identity
