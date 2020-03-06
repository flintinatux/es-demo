const { constant, curry } = require('tinyfunk')
const uuid = require('uuid/v4')

const debug = require('../lib/debug').extend('db')
const handleVersionConflict = require('../lib/handleVersionConflict')

const writeSql = 'SELECT message_store.write_message($1, $2, $3, $4, $5, $6)'

// writeMessage :: String -> Object -> Promise Object
const writeMessage = ({ query }) =>
  curry((streamName, message) => {
    if (!message.type)
      return Promise.reject(new Error('Messages must have a type'))

    const { data, expectedVersion, metadata, type } = message
    const id = uuid()
    const result = { id, type, data, metadata, expectedVersion }
    debug('writing message on %o: %o', streamName, result)

    const vals = [
      id,
      streamName,
      type,
      data,
      metadata,
      expectedVersion
    ]

    return query(writeSql, vals)
      .then(constant(result))
      .catch(handleVersionConflict({ expectedVersion, streamName }))
  })

module.exports = writeMessage
