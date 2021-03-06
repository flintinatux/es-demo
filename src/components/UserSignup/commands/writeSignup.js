const { writeMessage } = require('../../../lib/messages')

const writeSignup = ({ email, password, traceId, userId }) =>
  writeMessage({
    streamName: `userSignup:command-${userId}`,
    type: 'Signup',
    data: { email, password, userId },
    metadata: { traceId, userId }
  })

module.exports = writeSignup
