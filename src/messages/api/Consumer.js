const _ = require('highland')
const { merge } = require('tinyfunk')
const { tapP } = require('@articulate/funky')

const Consumer = db => opts => {
  const {
    batchSize = 1000,
    category,
    consumerId,
    handlers = {},
    groupMember,
    groupSize,
    init = Function.prototype,
    logger = console.log,
    positionUpdateInterval = 100,
    tickInterval = 100
  } = opts

  let count = 0
  let position = 0
  const suffix = groupMember ? `-${groupMember}:${groupSize}` : ''
  const streamName = `consumerPosition-${consumerId}${suffix}`
  let up = false

  const pollOpts = { batchSize, category, groupMember, groupSize }

  const assignPosition = msg => {
    position = msg ? msg.data.position : 0
  }

  const handleMessage = msg =>
    typeof handlers[msg.type] === 'function'
      ? _(tapP(handlers[msg.type])(msg))
      : _.of(msg)

  const loadPosition = () =>
    db.getLastStreamMessage(streamName).then(assignPosition)

  const poll = () => {
    const stream = db.getCategoryMessages(merge(pollOpts, { position }))

    if (typeof logger ==='function') stream.observe().each(logger)

    stream.flatMap(handleMessage)
      .stopOnError(stop)
      .flatMap(updatePosition)
      .done(tick)
  }

  const start = async () => {
    console.log(`Starting ${consumerId}`)
    up = true
    await init()
    await loadPosition()
    poll()
  }

  const stop = err => {
    if (err) console.error(err)
    console.log(`Stopping ${consumerId}`)
    up = false
  }

  const tick = () => {
    if (up) setTimeout(poll, tickInterval)
  }

  const updatePosition = msg => {
    position = msg.globalPosition + 1
    count++

    if (count >= positionUpdateInterval) {
      count = 0
      return writePosition()
    } else {
      return _.of()
    }
  }

  const writePosition = () =>
    _(db.writeMessage(streamName, {
      type: 'MessageRead',
      data: { position }
    }))

  return { handlers, start, stop }
}

module.exports = Consumer
