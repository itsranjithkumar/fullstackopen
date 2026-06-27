const express = require('express')
const app = express()

app.use(express.json())

// ------------------- DATA -------------------
let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

// ------------------- ROUTES -------------------

// GET all persons (3.1)
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// INFO page (3.2)
app.get('/info', (req, res) => {
  const time = new Date()

  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${time}</p>
  `)
})

// GET single person (3.3)
app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id)

  if (!person) {
    return res.status(404).end()
  }

  res.json(person)
})

// DELETE person (3.4)
app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => p.id !== req.params.id)
  res.status(204).end()
})

// POST new person (3.5 + 3.6 validation)
app.post('/api/persons', (req, res) => {
  const body = req.body

  // validation: missing fields
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  // validation: duplicate name
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

// ------------------- START SERVER -------------------
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})