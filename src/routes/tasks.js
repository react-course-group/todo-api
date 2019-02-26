const wz = require('wajez-api')
const {auth} = require('../middlewares')
const {Task, relations} = require('../models')

module.exports = wz.resource(Task, {
  defaults: {
    actions: [wz.beforeQuery(auth)]
  },
  relations
})