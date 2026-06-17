const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) return res.status(401).json({ message: 'Accès refusé, token manquant' })

  try {
    const verifie = jwt.verify(token, process.env.JWT_SECRET)
    req.utilisateur = verifie
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' })
  }
}