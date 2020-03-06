const { Consumer } = require('../lib/messages')
const mongodb = require('../lib/mongodb')

const createUserCred = async event => {
  const { data: { email, password, userId } } = event

  return (await mongodb('userCreds'))
    .updateOne(
      { _id: userId },
      { $setOnInsert: { email, password } },
      { upsert: true }
    )
}

module.exports =
  Consumer({
    name: 'UserCreds',
    category: 'userSignup',
    handlers: {
      SignedUp: createUserCred
    }
  })
