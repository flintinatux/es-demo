const { assoc } = require('tinyfunk')
const { assocWithP, evolveP, tapP } = require('@articulate/funky')
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')

const { accepted, error } = require('../../lib/responses')
const mongodb = require('../../lib/mongodb')
const trace = require('../../lib/trace')
const ValidationError = require('../../lib/ValidationError')
const writeSignup = require('../../components/UserSignup/commands/writeSignup')

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  userId: Joi.string().required()
}).required()

const ensureNotExisting = tapP(({ existing }) =>
  existing && Promise.reject(new ValidationError({ email: ['already taken'] }))
)

const existingIdentity = async ({ email }) =>
  (await mongodb('userCreds')).findOne({ email })

const hashPassword = password =>
  bcrypt.hash(password, 10)

const signup = async (req, res) =>
  schema.validateAsync(req.body)
    .then(assoc('traceId', req.meta.traceId))
    .then(assocWithP('existing', existingIdentity))
    .then(ensureNotExisting)
    .then(evolveP({ password: hashPassword }))
    .then(writeSignup)
    .then(accepted(res))
    .catch(error(res))

module.exports = trace(signup)
