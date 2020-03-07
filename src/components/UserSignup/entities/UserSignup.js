const { merge } = require('tinyfunk')

const { Entity } = require('../../../lib/messages')

const init = {
  email: null,
  locked: false,
  signedUp: false,
  userId: null
}

const SignedUp = (entity, event) =>
  merge(entity, {
    email: event.data.email,
    signedUp: true,
    userId: event.data.userId
  })

const UserSignup =
  Entity({
    name: 'UserSignup',
    category: 'userSignup',
    init,
    handlers: {
      SignedUp
    }
  })

module.exports = UserSignup
