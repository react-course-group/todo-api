const cors = require('cors')
const wz = require('wajez-api')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {seed} = require('wajez-utils')
const {User, Task, relations} = require('./models')
const routes = require('./routes')

const app = express()
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use(wz.router(routes))

app.use((err, req, res, next) => {
  res.status(500).json({error: err})
})

mongoose.connect('mongodb://mongo/todo', {useNewUrlParser: true})
.then(() => Task.remove({}))
.then(() => User.remove({}))
.then(() => seed({User: 10, Task: 100}, relations))
.then(() => app.listen(80))
.catch(console.error)
