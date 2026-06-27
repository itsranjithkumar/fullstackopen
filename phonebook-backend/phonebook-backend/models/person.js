const mongoose = require('mongoose')

const phoneValidator = (number) => {
  return /^\d{2,3}-\d{5,}$/.test(number)
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: phoneValidator,
      message:
        'Phone number must be in format XX-XXXXX or XXX-XXXXX and contain at least 8 characters'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)