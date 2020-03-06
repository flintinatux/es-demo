const components = [
  require('./UserSignup')
]

if (require.main === module)
  components.forEach(c => c.start())

module.exports = components
