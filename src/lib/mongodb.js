const memoize = require('lodash.memoize')
const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db =
  client.connect().then(c =>
    c.db('es')
  )

const collection = memoize(async name =>
  (await db).collection(name)
)

module.exports = collection
