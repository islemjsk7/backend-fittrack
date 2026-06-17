const express = require('express')
const router = express.Router()
const Seance = require('../models/Seance')
const auth = require('../middleware/auth')

// Ajouter une séance
router.post('/', auth, async (req, res) => {
  try {
    const { duree, exercices, notes } = req.body
    const seance = new Seance({
      utilisateur: req.utilisateur.id,
      duree,
      exercices,
      notes
    })
    await seance.save()
    res.status(201).json({ message: 'Séance ajoutée ✅', seance })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Récupérer toutes les séances de l'utilisateur
router.get('/', auth, async (req, res) => {
  try {
    const seances = await Seance.find({ utilisateur: req.utilisateur.id }).sort({ date: -1 })
    res.json(seances)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Supprimer une séance
router.delete('/:id', auth, async (req, res) => {
  try {
    await Seance.findByIdAndDelete(req.params.id)
    res.json({ message: 'Séance supprimée ✅' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router 