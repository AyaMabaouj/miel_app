const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes pour gérer les utilisateurs
router.get('/', userController.getAllUsers);  // Récupérer tous les utilisateurs
router.get('/:id', userController.getUserById);  // Récupérer un utilisateur par ID
router.post('/', userController.createUser);  // Ajouter un nouvel utilisateur
router.put('/:id', userController.updateUser);  // Mettre à jour un utilisateur
router.delete('/:id', userController.deleteUser);  // Supprimer un utilisateur
router.post('/login', userController.loginUser);  // Connexion de l'utilisateur

module.exports = router;
