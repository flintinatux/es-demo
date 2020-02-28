const components = [
  require('./Identity')
]

if (require.main === module)
  components.forEach(c => c.start())

module.exports = components
