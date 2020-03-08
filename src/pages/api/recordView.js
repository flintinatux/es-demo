const trace = require('../../lib/trace')

const { writeMessage } = require('../../lib/messages')

const writeViewed = ({ traceId, userId, videoId }) =>
  writeMessage({
    streamName: `viewing-${videoId}`,
    type: 'Viewed',
    data: {
      videoId,
      viewedAt: new Date().toJSON()
    },
    metadata: { traceId, userId }
  })

const recordView = async (req, res) => {
  const {
    body: { videoId },
    meta: { traceId, userId }
  } = req

  await writeViewed({ traceId, userId, videoId })

  res.status(202)
  res.end()
}

module.exports = trace(recordView)
