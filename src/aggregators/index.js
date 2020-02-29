const aggregators = [
  require('./HomePage'),
  require('./UserCreds')
]

if (require.main === module)
  aggregators.forEach(a => a.start())

module.exports = aggregators
