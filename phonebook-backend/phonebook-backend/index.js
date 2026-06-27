const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

// ---------------- MIDDLEWARE ----------------
app.use(cors())
app.use(express.json())

// safer morgan token
morgan.token('body', (req) => JSON.stringify(req.body || {}))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// ---------------- MONGODB ----------------
const url = 'mongodb://127.0.0.1:27017/phonebookApp'

mongoose.set('strictQuery', false)

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('MongoDB connection error:', error.message)
  })

// ---------------- ROUTES ----------------

// GET all persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

// INFO
app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `)
  })
})

// GET single person
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// CREATE person
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

// UPDATE person
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  const updatedPerson = { name, number }

  Person.findByIdAndUpdate(req.params.id, updatedPerson, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

// DELETE person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// ---------------- UNKNOWN ENDPOINT ----------------
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// ---------------- ERROR HANDLER ----------------
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})