const wz = require('wajez-api')
const U = require('wajez-utils')
const {auth} = require('../middlewares')
const {User, relations} = require('../models')
const {secret} = require('../config')

const crud = wz.resource(User, {
  defaults: {
    converter: {
      password: x => undefined
    }
  },
  list: {
    actions: [wz.beforeQuery(auth)]
  },
  edit: {
    actions: [wz.beforeQuery(auth)]
  },
  destroy: {
    actions: [wz.beforeQuery(auth)]
  },
  relations
})

const login = wz.login(secret, User, ['email', 'password'])

const me = wz.get('/me', [
  wz.beforeConvert([
    auth,
    wz.setData(async req => req.user),
    wz.convertData(async req =>
      U.applyConverter({
        id: U.id,
        email: U.I
      })
    )
  ])
])

module.exports = [
  ...crud,
  login,
  me
]