const cors = require('cors')
const wz = require('wajez-api')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {seed} = require('wajez-utils')

const Task = mongoose.model('Task', new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }, 
  content: String,
  done: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}))

const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String,
  tasks: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Task'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}))

const app = express()
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use((req, res, next) => {
  console.log({
    url: req.url,
    body: req.body,
    method: req.method
  })
  next()
})


app.use(wz.router([
  wz.login(
    'ThisIsSecure...',
    User, 
    ['email', 'password']
  )
]))

app.use(wz.auth({
  secret: 'ThisIsSecure...'
}, User))

// define the models and relations
const models = [User, Task]
const relations = [
  wz.oneMany('User', 'tasks', 'Task', 'author')
]

app.use(wz.api(models, relations))

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({error: err})
})

mongoose.connect('mongodb://mongo/todo', {useNewUrlParser: true})
.then(() => {
  Task.remove({})
  User.remove({})
})
.then(() => seed({User: 10, Task: 100}, relations))
.then(() => app.listen(80))
.catch(console.error)
