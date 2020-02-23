const trace = require('../../lib/trace')

const { writeMessage } = require('../../lib/messages')

const recordView = async (req, res) => {
  const {
    body: { videoId },
    meta: { traceId, userId }
  } = req

  const msg = {
    type: 'VideoViewed',
    metadata: { traceId, userId },
    data: {
      videoId,
      viewedAt: new Date().toJSON()
    }
  }

  await writeMessage(`videoViews-${videoId}`, msg)

  res.status(202)
  res.end()
}

module.exports = trace(recordView)
