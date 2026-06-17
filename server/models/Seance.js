const mongoose = require('mongoose')

const SeanceSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  duree: {
    type: Number,
    required: true
  },
  exercices: [
    {
      nom: String,
      series: Number,
      reps: Number,
      poids: Number
    }
  ],
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true })

module.exports = mongoose.model('Seance', SeanceSchema)