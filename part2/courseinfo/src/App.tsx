import { useState } from 'react'

/* ================= FILTER COMPONENT ================= */
const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={value} onChange={onChange} />
    </div>
  )
}

/* ================= PERSON FORM ================= */
const PersonForm = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>

      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

/* ================= PERSON LIST ================= */
const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

/* ================= ROOT APP ================= */
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  /* ====== ADD PERSON ====== */
  const addPerson = (event) => {
    event.preventDefault()

    const exists = persons.some(p => p.name === newName)

    if (exists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  /* ====== FILTER LOGIC ====== */
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      {/* FILTER */}
      <Filter
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <h3>Add a new</h3>

      {/* FORM */}
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>

      {/* LIST */}
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App