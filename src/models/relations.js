const wz = require('wajez-api')

module.exports = [
  wz.oneMany('User', 'tasks', 'Task', 'author')
]