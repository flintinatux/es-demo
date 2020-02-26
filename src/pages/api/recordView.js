const trace = require('../../lib/trace')

const { VideoViewed } = require('../../lib/types')
const { viewing } = require('../../lib/categories')
const { writeMessage } = require('../../lib/messages')

const recordView = async (req, res) => {
  const {
    body: { videoId },
    meta: { traceId, userId }
  } = req

  const msg = {
    type: VideoViewed,
    metadata: { traceId, userId },
    data: {
      videoId,
      viewedAt: new Date().toJSON()
    }
  }

  await writeMessage(`${viewing}-${videoId}`, msg)

  res.status(202)
  res.end()
}

module.exports = trace(recordView)
