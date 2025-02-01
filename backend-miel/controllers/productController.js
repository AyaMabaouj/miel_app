// controllers/productController.js
const productService = require('../services/productService');
const multer = require('multer');
const path = require('path');

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un produit par ID
exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Configuration de Multer pour gérer le téléchargement des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier où les fichiers seront enregistrés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom du fichier unique
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set a 5MB file size limit
});

// Ajouter un produit

exports.createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imagePath = req.file.path; // Get the path of the uploaded image
    const product = await productService.createProduct(req.body, imagePath);

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error); // Log the full error details
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    // Check if an image is uploaded
    let imagePath = null;
    if (req.file) {
      imagePath = req.file.path;  // Get the path of the uploaded image
    }

    // Update the product with new data and image if available
    const updatedProduct = await productService.updateProduct(req.params.id, req.body, imagePath);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Exporter l'upload pour utilisation dans les routes
exports.upload = upload;