const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// GET all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })

  res.json(blogs)
})

// CREATE blog (JWT PROTECTED)
blogsRouter.post('/', async (req, res) => {
  try {
    const { title, author, url, likes } = req.body

    const token = req.token || req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'token missing' })
    }

    const decoded = jwt.verify(token, process.env.SECRET)

    if (!decoded.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ error: 'user not found' })
    }

    if (!title || !url) {
      return res.status(400).json({ error: 'title or url missing' })
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const populatedBlog = await Blog.findById(savedBlog._id).populate('user', {
      username: 1,
      name: 1,
    })

    res.status(201).json(populatedBlog)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// UPDATE blog
blogsRouter.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate('user', {
      username: 1,
      name: 1,
    })

    res.json(updatedBlog)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// DELETE blog (ONLY OWNER)
blogsRouter.delete('/:id', async (req, res) => {
  try {
    const token = req.token || req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'token missing' })
    }

    const decoded = jwt.verify(token, process.env.SECRET)

    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== decoded.id) {
      return res.status(401).json({ error: 'not authorized' })
    }

    await Blog.findByIdAndDelete(req.params.id)

    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = blogsRouter