const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Blog = require('./models/blog')

const app = express()

mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(error.message))

app.use(express.json())

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

app.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

module.exports = app