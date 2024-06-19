const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carritoSchema = new Schema({
  // userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Quita el required
  items: [
    {
      productoId: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Carrito', carritoSchema);
