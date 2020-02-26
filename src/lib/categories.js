const { identity, indexBy } = require('tinyfunk')

const categories = [
  'viewing'
]

module.exports = indexBy(identity, categories)
