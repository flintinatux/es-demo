const { assoc, constant, curry } = require('tinyfunk')
const uuid = require('uuid/v4')

const versionConflict = require('../lib/versionConflict')

const writeSql = 'SELECT message_store.write_message($1, $2, $3, $4, $5, $6)'

// writeMessage :: String -> Object -> Promise Object
const writeMessage = ({ query }) =>
  curry((streamName, message) => {
    if (!message.type)
      return Promise.reject(new Error('Messages must have a type'))

    const { data, expectedVersion, metadata, type } = message
    const id = uuid()

    const vals = [
      id,
      streamName,
      type,
      data,
      metadata,
      expectedVersion
    ]

    return query(writeSql, vals)
      .then(constant(assoc('id', id, message)))
      .catch(versionConflict({ expectedVersion, streamName }))
  })

module.exports = writeMessage
