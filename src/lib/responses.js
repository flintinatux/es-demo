const { cond, constant, is, path, prop } = require('tinyfunk')

const ValidationError = require('./ValidationError')

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
    [ is(ValidationError), constant(400) ],
    [ constant(true), constant(500) ]
  ])

module.exports = {
  accepted,
  error
}
