const { Consumer } = require('../lib/messages')
const mongodb = require('../lib/mongodb')

const init = {
  lastViewProcessed: 0,
  videosWatched: 0
}

const ensureHomePage = async () =>
  (await mongodb('pages'))
    .updateOne(
      { _id: 'home' },
      { $setOnInsert: init },
      { upsert: true }
    )

const incrementVideosWatched = async ({ globalPosition }) =>
  (await mongodb('pages'))
    .updateOne(
      { _id: 'home', lastViewProcessed: { $lt: globalPosition } },
      { $inc: { videosWatched: 1 },
        $set: { lastViewProcessed: globalPosition } }
    )

module.exports =
  Consumer({
    name: 'HomePage',
    category: 'viewing',
    init: ensureHomePage,
    handlers: {
      Viewed: incrementVideosWatched
    }
  })
