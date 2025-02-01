// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


const multer = require('multer');
const path = require('path');

// Charger les variables d'environnement
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connexion à MongoDB
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// Test de la route
app.get('/', (req, res) => {
  res.send('API Backend pour la gestion des produits');
});

// Utilisation des routes pour les produits
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes); // Routes des catégories

// Utilisation du routeur des utilisateurs
app.use('/api/users', userRoutes);  
app.use('/api/orders', orderRoutes);
// Servir les fichiers statiques (images téléchargées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
