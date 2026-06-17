const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  lu: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Notification', NotificationSchema)