const userService = require('../services/userService');

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Ajouter un utilisateur avec validation supplémentaire
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, address, number } = req.body;

    // Validation de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validation du numéro de téléphone (8 à 15 chiffres)
    if (!/^\d{8,15}$/.test(number)) {
      return res.status(400).json({ message: 'Invalid phone number. It must contain 8 to 15 digits.' });
    }

    // Appel au service pour créer l'utilisateur
    const user = await userService.createUser({ name, email, password, address, number });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: `Error creating user: ${error.message}` });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Connexion de l'utilisateur
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
