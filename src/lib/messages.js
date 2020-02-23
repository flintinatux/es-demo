module.exports = require('../messages')({
  connectionString: process.env.MESSAGE_STORE_URI,
  max: 10
})
