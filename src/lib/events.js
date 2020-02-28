const { path, tap } = require('tinyfunk')

const prevent = tap(event =>
  event.preventDefault()
)

const targetVal =
  path(['target', 'value'])

module.exports = {
  prevent,
  targetVal
}
