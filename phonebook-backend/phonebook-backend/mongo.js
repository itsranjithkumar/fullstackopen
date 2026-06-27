const mongoose = require('mongoose')

// ---------------- LOCAL MONGODB ----------------
const url = 'mongodb://127.0.0.1:27017/phonebookApp'

mongoose.set('strictQuery', false)
mongoose.connect(url)

// ---------------- MODEL ----------------
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// ---------------- LOGIC ----------------
const argsLength = process.argv.length

if (argsLength === 2) {
  // LIST ALL
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })

} else {
  const name = process.argv[2]
  const number = process.argv[3]

  const person = new Person({
    name,
    number
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}