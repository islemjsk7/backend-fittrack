const express = require('express')
const router = express.Router()
const Notification = require('../models/Notification')
const auth = require('../middleware/auth')

// Récupérer toutes les notifications de l'utilisateur
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      utilisateur: req.utilisateur.id 
    }).sort({ createdAt: -1 })
    res.json(notifications)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Marquer une notification comme lue
router.put('/:id', auth, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { lu: true })
    res.json({ message: 'Notification marquée comme lue ✅' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Marquer toutes les notifications comme lues
router.put('/', auth, async (req, res) => {
  try {
    await Notification.updateMany({ utilisateur: req.utilisateur.id }, { lu: true })
    res.json({ message: 'Toutes les notifications lues ✅' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router