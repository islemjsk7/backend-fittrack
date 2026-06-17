module.exports = (req, res, next) => {
  if (req.utilisateur.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé, admin seulement' })
  }
  next()
}