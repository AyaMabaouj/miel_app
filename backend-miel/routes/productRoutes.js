// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Définir les routes pour les produits
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
// Route POST pour ajouter un produit avec une image
router.post('/', productController.upload.single('image'), productController.createProduct);
router.put('/:id', productController.upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
