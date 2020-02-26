const { identity, indexBy } = require('tinyfunk')

const types = [
  'VideoViewed'
]

module.exports = indexBy(identity, types)
