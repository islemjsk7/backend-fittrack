const mongoose = require('mongoose')

const UtilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  typeSport: {
    type: String,
    default: ''
  },
  objectif: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'utilisateur'
  }
}, { timestamps: true })

module.exports = mongoose.model('Utilisateur', UtilisateurSchema)