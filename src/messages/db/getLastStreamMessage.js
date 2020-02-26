const { head } = require('tinyfunk')

const parseMessage = require('../lib/parseMessage')

const sql = `SELECT * FROM get_last_stream_message($1)`

// getLastStreamMessage :: String -> Promise Message
const getLastStreamMessage = ({ query }) => streamName => {
  const vals = [ streamName ]

  return query(sql, vals)
    .then(head)
    .then(parseMessage)
}

module.exports = getLastStreamMessage
