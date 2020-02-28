const aggregators = [
  require('./HomePage')
]

if (require.main === module)
  aggregators.forEach(a => a.start())

module.exports = aggregators
