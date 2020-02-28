const accepted = res => () => {
  res.status(202)
  res.end()
}

const error = res => err => {
  res.status(err.isJoi ? 400 : 500)
  res.json(err)
}

module.exports = {
  accepted,
  error
}
