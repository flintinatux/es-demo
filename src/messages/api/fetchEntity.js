const { curry } = require('tinyfunk')

const handle = handlers => (entity, event) =>
  handlers[event.type] ? handlers[event.type](entity, event) : entity

// fetchEntity :: Projection -> String -> Promise a
const fetchEntity = db => curry((projection, streamName) => {
  const { init, handlers={}, name } = projection

  if (!name)
    return Promise.reject(new Error('Each projection must have a unique name'))

  return db.getStreamMessages({ streamName })
    .reduce(init, handle(handlers))
    .toPromise(Promise)
})

module.exports = fetchEntity
