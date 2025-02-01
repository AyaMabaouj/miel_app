const orderService = require('../services/orderService');

// Créer une nouvelle commande
exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer toutes les commandes
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une commande par ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Mettre à jour le statut d'une commande
exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Supprimer une commande
exports.deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrder(req.params.id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
