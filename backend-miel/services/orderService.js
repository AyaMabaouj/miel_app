const Order = require('../models/Order');

// Créer une nouvelle commande
exports.createOrder = async (orderData) => {
  try {
    const order = new Order(orderData);
    return await order.save();
  } catch (error) {
    throw new Error('Error creating order: ' + error.message);
  }
};

// Récupérer toutes les commandes
exports.getAllOrders = async () => {
  try {
    return await Order.find()
      .populate({
        path: 'products.productId',  // Populate the `productId` field
        select: 'name price',  // You can add any other fields that are relevant to display
      })
      .populate('user');  // Populate the user data as well
  } catch (error) {
    throw new Error('Error fetching orders: ' + error.message);
  }
};


// Récupérer une commande par ID
exports.getOrderById = async (id) => {
  try {
    const order = await Order.findById(id).populate('products.productId').populate('user');
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  } catch (error) {
    throw new Error('Error fetching order: ' + error.message);
  }
};

// Mettre à jour le statut d'une commande
exports.updateOrderStatus = async (id, status) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      throw new Error('Order not found');
    }
    return updatedOrder;
  } catch (error) {
    throw new Error('Error updating order: ' + error.message);
  }
};

// Supprimer une commande
exports.deleteOrder = async (id) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      throw new Error('Order not found');
    }
    return deletedOrder;
  } catch (error) {
    throw new Error('Error deleting order: ' + error.message);
  }
};
