const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const seancesRoutes = require('./routes/seances')
const notificationsRoutes = require('./routes/notifications')

const app = express()

app.use(cors())
app.use(express.json())

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté ✅'))
  .catch((err) => console.log('Erreur MongoDB :', err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/seances', seancesRoutes)
app.use('/api/notifications', notificationsRoutes)

app.get('/', (req, res) => {
  res.send('Serveur FitTrack opérationnel ✅')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`)
})