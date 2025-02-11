const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

// Routes pour gérer les utilisateurs
router.get('/', userController.getAllUsers);  // Récupérer tous les utilisateurs
router.get('/:id', userController.getUserById);  // Récupérer un utilisateur par ID
router.put('/:id', userController.updateUser);  // Mettre à jour un utilisateur
router.delete('/:id', userController.deleteUser);  // Supprimer un utilisateur
// Route pour accéder au profil utilisateur
router.get('/profile', authenticate, (req, res) => {
    res.status(200).json({ message: 'Profile access granted', user: req.user });
});

  module.exports = router;