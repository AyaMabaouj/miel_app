const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Créer une commande
router.post('/', orderController.createOrder);

// Récupérer toutes les commandes
router.get('/', orderController.getAllOrders);

// Récupérer une commande par ID
router.get('/:id', orderController.getOrderById);

// Mettre à jour le statut d'une commande
router.put('/:id/status', orderController.updateOrderStatus);

// Supprimer une commande
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
