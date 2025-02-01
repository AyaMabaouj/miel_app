const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Shipped, Delivered
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
