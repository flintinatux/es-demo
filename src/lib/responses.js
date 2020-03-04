const { cond, constant, path, prop } = require('tinyfunk')

const accepted = res => () => {
  res.status(202)
  res.end()
}

const error = res => err => {
  console.error(err)
  res.status(statusCode(err))
  res.json(err)
}

const statusCode =
  cond([
    [ prop('isJoi'), constant(400) ],
    [ prop('isBoom'), path(['output', 'statusCode']) ],
    [ constant(true), constant(500) ]
  ])

module.exports = {
  accepted,
  error
}
