// models/Product.js
const mongoose = require('mongoose');

// Définir le schéma du produit
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Liaison avec le modèle Category

  image: {
    type: String, // Chemin de l'image
  },
});

// Créer le modèle basé sur le schéma
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
