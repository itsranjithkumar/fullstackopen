const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const app = express()

// ---------------- MIDDLEWARE ----------------
app.use(cors())
app.use(express.json())

// Morgan logging (3.7–3.8)
morgan.token('post-data', (req) => JSON.stringify(req.body))

const customFormat = ':method :url :status :response-time ms :post-data'
app.use(morgan(customFormat))

// ---------------- DATA ----------------
let persons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' }
]

// ---------------- ROUTES ----------------

// GET all persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// INFO page
app.get('/info', (req, res) => {
  const time = new Date()

  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${time}</p>
  `)
})

// GET single person
app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id)

  if (!person) {
    return res.status(404).end()
  }

  res.json(person)
})

// DELETE person
app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => p.id !== req.params.id)
  res.status(204).end()
})

// POST person
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  const exists = persons.find(p => p.name === body.name)

  if (exists) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    id: String(Math.floor(Math.random() * 1000000)),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)

  res.json(newPerson)
})

// ---------------- STATIC FRONTEND (3.11 FIX) ----------------

// serve React build
app.use(express.static('dist'))

// SAFE fallback (NO wildcard route)
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})