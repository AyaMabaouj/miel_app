const bcrypt = require('bcrypt');
const User = require('../models/User');

// Récupérer tous les utilisateurs
exports.getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};

// Récupérer un utilisateur par son ID
exports.getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
};

// Ajouter un nouvel utilisateur
exports.createUser = async (userData) => {
    try {
      // Hacher le mot de passe avant de sauvegarder
      const salt = await bcrypt.genSalt(10);  // Générer un salt avec 10 rounds
      const hashedPassword = await bcrypt.hash(userData.password, salt);  // Hacher le mot de passe avec le salt
  
      const user = new User({ ...userData, password: hashedPassword });
      return await user.save();
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  };

// Mettre à jour un utilisateur par ID
exports.updateUser = async (id, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};

// Supprimer un utilisateur par ID
exports.deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return deletedUser;
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
};

// Vérifier les informations de connexion (email et mot de passe)
exports.authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    return user;
  } catch (error) {
    throw new Error('Authentication failed: ' + error.message);
  }
};
