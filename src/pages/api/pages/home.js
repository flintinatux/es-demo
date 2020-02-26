const mongodb = require('../../../lib/mongodb')

const loadPageData = async () =>
  (await mongodb('pages')).findOne({ _id: 'home' })

const home = async (req, res) => {
  const data = await loadPageData()
  res.json(data)
}

module.exports = home
