const aggregators = [
  require('./homePage')
]

if (require.main === module)
  aggregators.forEach(a => a.start())

module.exports = aggregators
