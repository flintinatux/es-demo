const { backoff } = require('@articulate/funky')
const { is } = require('tinyfunk')

const { VersionConflictError } = require('./messages')

const retryOnConflict =
  backoff({ when: is(VersionConflictError) })

module.exports = retryOnConflict
