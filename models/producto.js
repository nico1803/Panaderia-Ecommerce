// models/producto.js
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  descripcion: String,
  precio: Number,
  imagen: String
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
