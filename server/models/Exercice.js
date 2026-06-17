const mongoose = require('mongoose')

const ExerciceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  categorie: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  creeParAdmin: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Exercice', ExerciceSchema)