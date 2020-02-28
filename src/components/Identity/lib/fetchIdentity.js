const { assoc, merge } = require('tinyfunk')

const { fetchEntity } = require('../../../lib/messages')

const AccountLocked =
  assoc('locked', true)

const Registered = (entity, event) =>
  merge(entity, {
    email: event.data.email,
    registered: true,
    userId: event.data.userId
  })

const fetchIdentity =
  fetchEntity({
    name: 'components:Identity:fetchIdentity',
    init: {
      email: null,
      locked: false,
      registered: false,
      userId: null
    },
    handlers: {
      AccountLocked,
      Registered
    }
  })

module.exports = fetchIdentity
