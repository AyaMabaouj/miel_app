const Category = require('../models/Category');

// Ajouter une nouvelle catégorie
exports.createCategory = async (categoryData) => {
  try {
    const category = new Category(categoryData);
    return await category.save();
  } catch (error) {
    throw new Error('Error creating category: ' + error.message);
  }
};

// Récupérer toutes les catégories
exports.getAllCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw new Error('Error fetching categories: ' + error.message);
  }
};

// Récupérer une catégorie par ID
exports.getCategoryById = async (id) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  } catch (error) {
    throw new Error('Error fetching category: ' + error.message);
  }
};

// Mettre à jour une catégorie
exports.updateCategory = async (id, categoryData) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, { new: true });
    if (!updatedCategory) {
      throw new Error('Category not found');
    }
    return updatedCategory;
  } catch (error) {
    throw new Error('Error updating category: ' + error.message);
  }
};

// Supprimer une catégorie
exports.deleteCategory = async (id) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw new Error('Category not found');
    }
    return deletedCategory;
  } catch (error) {
    throw new Error('Error deleting category: ' + error.message);
  }
};
