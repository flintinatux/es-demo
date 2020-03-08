const { pick } = require('tinyfunk')

const retryOnConflict = require('../../../lib/retryOnConflict')
const UserSignup = require('../entities/UserSignup')
const { writeMessage } = require('../../../lib/messages')

const Signup = async ({ data, metadata }) => {
  const [ userSignup, version ] = await UserSignup.fetch(data.userId)

  if (!userSignup.registered) {
    writeMessage({
      streamName: `userSignup-${data.userId}`,
      type: 'SignedUp',
      metadata: pick(['traceId', 'userId'], metadata),
      data: pick(['email', 'password', 'userId'], data),
      expectedVersion: version
    })
  }
}

module.exports =
  retryOnConflict(Signup)
