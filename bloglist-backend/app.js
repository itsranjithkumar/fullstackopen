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

// GET all blogs
app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// ADD new blog
app.post('/api/blogs', async (request, response) => {
  try {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(400).json({
      error: error.message
    })
  }
})
app.delete('/api/blogs/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

app.put('/api/blogs/:id', async (request, response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true
      }
    )

    response.json(updatedBlog)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

module.exports = app