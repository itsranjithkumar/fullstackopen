const mongoose = require('mongoose')

// ---------------- COMMAND LINE ARGS ----------------
const password = process.argv[2]

const name = process.argv[3]
const number = process.argv[4]

// ---------------- DB URL ----------------
const url = `mongodb+srv://fullstack:${password}@cluster0.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

// ---------------- MODEL ----------------
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// ---------------- LOGIC ----------------
if (process.argv.length === 3) {
  // LIST ALL
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  // ADD NEW PERSON
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}