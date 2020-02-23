const { curry } = require('tinyfunk')
const uuid = require('uuid/v4')

const writeSql = 'SELECT message_store.write_message($1, $2, $3, $4, $5, $6)'

const versionConflict = require('./versionConflict')

const writeMessage = ({ db }) =>
  curry((streamName, message) => {
    if (!message.type) throw new Error('Messages must have a type')

    const { data, expectedVersion, metadata, type } = message

    const vals = [
      uuid(),
      streamName,
      type,
      data,
      metadata,
      expectedVersion
    ]

    return db.query(writeSql, vals)
      .catch(versionConflict({ expectedVersion, streamName }))
  })

module.exports = writeMessage
