const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/BlacklistToken');

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
// Inscription d'un nouvel utilisateur
exports.registerUser = async (userData) => {
  try {
    const { email, password } = userData;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer et sauvegarder l'utilisateur
    const user = new User({ ...userData, password: hashedPassword });
    return await user.save();
  } catch (error) {
    throw new Error('Error registering user: ' + error.message);
  }
};

// Authentification de l'utilisateur
exports.loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token, user };
  } catch (error) {
    throw new Error('Authentication failed: ' + error.message);
  }
};

//logout 
exports.logoutUser = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const expirationTime = new Date(decoded.exp * 1000); // Convert to milliseconds

    // Save token to the blacklist
    await BlacklistToken.create({ token, expiresAt: expirationTime });

    return { message: 'User logged out successfully' };
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};