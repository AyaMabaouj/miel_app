const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex pour vérifier l'adresse e-mail
  },
  password: { type: String, required: true },
  address: { type: String },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{8,15}$/.test(v); // Accepte un numéro entre 8 et 15 chiffres
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  role: { type: String, default: 'Client' }, // Client or Admin
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
