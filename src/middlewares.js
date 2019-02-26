const wz = require('wajez-api')
const {secret} = require('./config')
const {User, Task} = require('./models')

const auth = wz.auth({secret}, User)

module.exports = {auth}