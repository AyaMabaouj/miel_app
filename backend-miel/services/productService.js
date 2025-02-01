// services/productService.js
const Product = require('../models/Product');
const mongoose = require('mongoose');


// Récupérer tous les produits
exports.getAllProducts = async () => {
  try {
    return await Product.find();
  } catch (error) {
    throw new Error('Error fetching products: ' + error.message);
  }
};

// Récupérer un produit par ID
exports.getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error('Error fetching product: ' + error.message);
  }
};

exports.createProduct = async (productData, imagePath) => {
  try {
    const { name, description, price, stock, category } = productData;
    const categoryId = new mongoose.Types.ObjectId(category);

    const product = new Product({
      name,
      description,
      price,
      stock,
      category: categoryId, // Save ObjectId reference
      image: imagePath,
    });

    return await product.save();
  } catch (error) {
    throw new Error('Error creating product: ' + error.message);
  }
};

// Mettre à jour un produit par ID
exports.updateProduct = async (id, productData, imagePath) => {
  try {
    // If an image is provided, update the image path
    if (imagePath) {
      productData.image = imagePath;
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
    
    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    return updatedProduct;
  } catch (error) {
    throw new Error('Error updating product: ' + error.message);
  }
};

// Supprimer un produit par ID
exports.deleteProduct = async (id) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error('Product not found');
    }
    return deletedProduct;
  } catch (error) {
    throw new Error('Error deleting product: ' + error.message);
  }
};
