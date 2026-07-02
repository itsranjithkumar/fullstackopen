const express = require('express')
const mongoose = require('mongoose')

const config = require('./utils/config')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')

const tokenExtractor = require('./middleware/tokenExtractor')

const app = express()

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err))

app.use(express.json())

// 🔥 IMPORTANT: token must be extracted before routes
app.use(tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)

module.exports = app