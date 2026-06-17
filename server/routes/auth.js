const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Utilisateur = require('../models/Utilisateur')

// Inscription
router.post('/inscription', async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body

    const existant = await Utilisateur.findOne({ email })
    if (existant) return res.status(400).json({ message: 'Email déjà utilisé' })

    const hash = await bcrypt.hash(motDePasse, 10)

    const utilisateur = new Utilisateur({ nom, email, motDePasse: hash })
    await utilisateur.save()

    res.status(201).json({ message: 'Compte créé avec succès' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Connexion
router.post('/connexion', async (req, res) => {
  try {
    const { email, motDePasse } = req.body

    const utilisateur = await Utilisateur.findOne({ email })
    if (!utilisateur) return res.status(400).json({ message: 'Email incorrect' })

    const valide = await bcrypt.compare(motDePasse, utilisateur.motDePasse)
    if (!valide) return res.status(400).json({ message: 'Mot de passe incorrect' })

    const token = jwt.sign(
      { id: utilisateur._id, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, utilisateur: { id: utilisateur._id, nom: utilisateur.nom, role: utilisateur.role } })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router