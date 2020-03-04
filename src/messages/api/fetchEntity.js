const { copyProp } = require('@articulate/funky')
const { dissoc, identity, pipe, prop, when } = require('tinyfunk')
const LRUCache = require('mnemonist/lru-cache')
const mergeDeepRight = require('ramda/src/mergeDeepRight')

const applyDefaults =
  mergeDeepRight({
    cache: {
      enabled: true,
      limit: 1000
    },
    projection: {
      handlers: {}
    },
    snapshot: {
      enabled: true,
      interval: 100
    }
  })

// fetchEntity :: Object -> String -> Promise a
const fetchEntity = db => opts => {
  const {
    cache,
    category,
    name,
    projection: { init, handlers },
    snapshot
  } = applyDefaults(opts)

  if (!category)
    throw new Error('Each projection must specify a category')

  if (!name)
    throw new Error('Each projection must have a unique name')

  const _cache = new LRUCache(cache.limit)

  const fetch = async id => {
    let record

    if (cache.enabled)
      record = _cache.get(id)

    if (snapshot.enable && record === undefined)
      record = await getSnapshot(id)

    if (record === undefined)
      record = {
        entity: init,
        lastSnapshot: 0,
        version: 0
      }

    record = await db.getStreamMessages({
      streamName: `${category}-${id}`,
      position: record.version
    }).reduce(record, handle)
      .toPromise(Promise)

    if (
      snapshot.enabled &&
      (record.version - record.lastSnapshot) >= snapshot.interval
    ) {
      record.lastSnapshot = record.version
      await putSnapshot(id, record)
    }

    if (cache.enabled)
      _cache.set(id, record)

    return record.entity
  }

  const getSnapshot = id =>
    db.getLastStreamMessage(`${name}:snapshot-${id}`)
      .then(parseSnapshot)

  const handle = (record, event) => {
    const handler = handlers[event.type] || identity
    return {
      entity: handler(record.entity, event),
      lastSnapshot: record.lastSnapshot,
      version: event.position
    }
  }

  const putSnapshot = (id, record) =>
    db.writeMessage(`${name}:snapshot-${id}`, {
      type: 'Recorded',
      data: dissoc('lastSnapshot', record)
    })

  return fetch
}

const parseSnapshot =
  when(Boolean, pipe(
    prop('data'),
    copyProp('version', 'lastSnapshot')
  ))

module.exports = fetchEntity
