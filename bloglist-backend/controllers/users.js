const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// GET all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1
  })

  response.json(users)
})

// CREATE user
usersRouter.post('/', async (request, response) => {
  try {
    const { username, name, password } = request.body

    if (!password || password.length < 3) {
      return response.status(400).json({
        error: 'password must be at least 3 characters long'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return response.status(400).json({
        error: 'username must be unique'
      })
    }

    if (error.name === 'ValidationError') {
      return response.status(400).json({
        error: error.message
      })
    }

    response.status(500).json({
      error: 'internal server error'
    })
  }
})

module.exports = usersRouter