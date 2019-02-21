const cors = require('cors')
const wz = require('wajez-api')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {seed} = require('wajez-utils')

const Task = mongoose.model('Task', new mongoose.Schema({
  content: String,
  done: Boolean,
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

app.use(wz.api([Task], []))

mongoose.connect('mongodb://mongo/todo', {useNewUrlParser: true})
.then(() => Task.remove({}))
.then(() => seed({Task: 10}, []))
.then(() => app.listen(80))
.catch(console.error)
