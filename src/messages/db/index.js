const _ = require('highland')
const { mapObj, thrush } = require('tinyfunk')
const { Pool } = require('pg')
const QueryStream = require('pg-query-stream')

const db = {
  getCategoryMessages: require('./getCategoryMessages'),
  getLastStreamMessage: require('./getLastStreamMessage'),
  getStreamMessages: require('./getStreamMessages'),
  writeMessage: require('./writeMessage')
}

const setPath = client =>
  client.query('SET search_path = message_store, public')

// See the following for available options:
// - https://node-postgres.com/api/client
// - https://node-postgres.com/api/pool
const dbFactory = opts => {
  const pool = new Pool(opts)

  // query :: (String, [a]) -> Promise b
  const query = async (sql, vals=[]) => {
    const client = await pool.connect()
    await setPath(client)
    const res = await client.query(sql, vals)
    client.release()
    return res.rows
  }

  // queryS :: (String, [a]) -> Stream b
  const queryS = (sql, vals=[]) =>
    _((async () => {
        const client = await pool.connect()
        await setPath(client)
        const stream = client.query(new QueryStream(sql, vals))
        stream.on('end', () => client.release())
        return _(stream)
      })()
    ).flatten()

  return mapObj(thrush({ query, queryS }), db)
}

module.exports = dbFactory
