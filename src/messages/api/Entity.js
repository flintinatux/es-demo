const { copyProp } = require('@articulate/funky')
const mergeDeepRight = require('ramda/src/mergeDeepRight')

const {
  compose, identity, merge, omit, pipe, prop, when
} = require('tinyfunk')

// See https://github.com/dominictarr/bench-lru for benchmark comparison
// of available LRU cache implementations.  Mnemonist implements a doubly
// linked list that far outperforms the rest.
const LRUCache = require('mnemonist/lru-cache')

const emptyRecord = {
  entity: null,
  id: null,
  snapshotTime: null,
  snapshotVersion: -1,
  time: null,
  version: -1
}

const applyDefaults =
  mergeDeepRight({
    cache: {
      enabled: true,
      limit: 1000
    },
    snapshot: {
      enabled: true,
      interval: 100
    }
  })

const cleanSnapshot =
  omit(['snapshotTime', 'snapshotVersion'])

const copySnapshotMeta =
  pipe(
    copyProp('time', 'snapshotTime'),
    copyProp('version', 'snapshotVersion')
  )

const parseSnapshot =
  when(Boolean, compose(copySnapshotMeta, prop('data')))

// Entity :: Object -> String -> Promise [ a, Number ]
const Entity = db => opts => {
  const {
    cache,
    category,
    handlers = {},
    init,
    name,
    snapshot
  } = applyDefaults(opts)

  if (!category)
    throw new Error('Each entity must specify a category')

  if (!name)
    throw new Error('Each entity must have a unique name')

  const _cache = new LRUCache(cache.limit)

  const fetch = async id => {
    let record

    if (cache.enabled)
      record = _cache.get(id)

    if (snapshot.enable && record === undefined)
      record = await getSnapshot(id)

    if (record === undefined)
      record = merge(emptyRecord, { entity: init, id })

    record = await db.getStreamMessages({
      streamName: `${category}-${id}`,
      position: record.version
    }).reduce(record, handle)
      .toPromise(Promise)

    if (
      snapshot.enabled &&
      (record.version - record.snapshotVersion) >= snapshot.interval
    ) {
      record = copySnapshotMeta(record)
      await putSnapshot(id, record)
    }

    if (cache.enabled)
      _cache.set(id, record)

    return [ record.entity, record.version ]
  }

  const getSnapshot = id =>
    db.getLastStreamMessage(`${name}:snapshot-${id}`)
      .then(parseSnapshot)

  const handle = (record, event) => {
    const handler = handlers[event.type] || identity

    return merge(record, {
      entity: handler(record.entity, event),
      time: new Date().toJSON(),
      version: event.position
    })
  }

  const putSnapshot = (id, record) =>
    db.writeMessage(`${name}:snapshot-${id}`, {
      type: 'Recorded',
      data: cleanSnapshot(record)
    })

  return { fetch }
}

module.exports = Entity
