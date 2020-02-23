const _ = require('highland')
const { Pool } = require('pg')
const QueryStream = require('pg-query-stream')

const setPath = client =>
  client.query('SET search_path = message_store, public')

// see the following for available options:
// https://node-postgres.com/api/client
// https://node-postgres.com/api/pool
const db = opts => {
  const pool = new Pool(opts)

  const query = async (sql, vals=[]) => {
    const client = await pool.connect()
    await setPath(client)
    const res = await client.query(sql, vals)
    client.release()
    return res
  }

  const queryS = (sql, vals=[]) =>
    _((async () => {
        const client = await pool.connect()
        await setPath(client)
        const stream = client.query(new QueryStream(sql, vals))
        stream.on('end', () => client.release())
        return stream
      })()
    ).flatten()

  return { query, queryS }
}

module.exports = db
