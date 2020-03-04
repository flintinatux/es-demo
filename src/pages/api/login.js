const { assoc, defaultTo } = require('tinyfunk')
const { assocWithP, rename, tapP } = require('@articulate/funky')
const bcrypt = require('bcrypt')
const Boom = require('@hapi/boom')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')

const { error } = require('../../lib/responses')
const mongodb = require('../../lib/mongodb')
const trace = require('../../lib/trace')
const { writeMessage } = require('../../lib/messages')

const JWT_SECRET = process.env.JWT_SECRET

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
}).required()

const getUserCred = async ({ email }) =>
  (await mongodb('userCreds'))
    .findOne({ email })
    .then(defaultTo({}))
    .then(rename('_id', 'userId'))

const issueJwt = ({ traceId, userCred: { userId } }) =>
  jwt.sign({ sub: userId, traceId }, JWT_SECRET)

const login = (req, res) =>
  schema.validateAsync(req.body)
    .then(assoc('traceId', req.meta.traceId))
    .then(assocWithP('userCred', getUserCred))
    .then(validatePassword)
    .then(trackLogin)
    .then(issueJwt)
    .then(respond(res))
    .catch(trackFailure)
    .catch(error(res))

const respond = res => jwt => {
  res.status(204)
  res.setHeader('set-cookie', `id_token=${jwt}; domain=localhost; path=/; httponly`)
  res.end()
}

const trackFailure = async err => {
  const { traceId, userCred: { userId }={} } = err.data || {}

  if (userId) {
    await writeMessage(`authentication-${userId}`, {
      type: 'UserLoginFailed',
      metadata: { traceId, userId },
      data: { reason: 'Incorrect password', userId }
    })
  }

  return Promise.reject(err)
}

const trackLogin = tapP(({ traceId, userCred: { userId } }) =>
  writeMessage(`authentication-${userId}`, {
    type: 'UserLoggedIn',
    metadata: { traceId, userId },
    data: { userId }
  })
)

const validatePassword = tapP(data => {
  const { password, userCred } = data

  return bcrypt.compare(password, userCred.password)
    .then(valid =>
      valid || Promise.reject(Boom.forbidden('Forbidden', data))
    )
})

module.exports = trace(login)
