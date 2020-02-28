const { assocWithP } = require('@articulate/funky')
const { compose, objOf, path, pipeP, prop, unless } = require('tinyfunk')

const fetchIdentity = require('../lib/fetchIdentity')
const { writeMessage } = require('../../../lib/messages')

const alreadyRegistered =
  path(['identity', 'registered'])

const streamName = command =>
  `identity-${command.data.userId}`

const getIdentity =
  compose(fetchIdentity, streamName, prop('command'))

const writeRegistered = ({ command }) =>
  writeMessage(streamName(command), {
    type: 'Registered',
    metadata: {
      traceId: command.metadata.traceId,
      userId: command.metadata.userId
    },
    data: {
      email: command.data.email,
      password: command.data.password,
      userId: command.data.userId
    }
  })

const Register =
  pipeP(
    objOf('command'),
    assocWithP('identity', getIdentity),
    unless(alreadyRegistered, writeRegistered)
  )

module.exports = Register
