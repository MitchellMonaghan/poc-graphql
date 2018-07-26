import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  authorId: String
})

module.exports = mongoose.model('Book', bookSchema)
