const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express()

const mongoUrl = 'mongodb://127.0.0.1:27017/bloglist'

mongoose.set('strictQuery', false)

mongoose
  .connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(error.message))

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

module.exports = app