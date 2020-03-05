const { pick } = require('tinyfunk')

const Identity = require('../lib/Identity')
const retryOnConflict = require('../../../lib/retryOnConflict')
const { writeMessage } = require('../../../lib/messages')

const Register = async ({ data, metadata }) => {
  const [ identity, version ] = await Identity.fetch(data.userId)

  if (!identity.registered) {
    writeMessage(`identity-${data.userId}`, {
      type: 'Registered',
      metadata: pick(['traceId', 'userId'], metadata),
      data: pick(['email', 'password', 'userId'], data),
      expectedVersion: version
    })
  }
}

module.exports =
  retryOnConflict(Register)
