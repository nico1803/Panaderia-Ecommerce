// cargarProductos.js
const fs = require('fs');
const path = require('path');
const Producto = require('./models/producto'); // Importa el modelo de Producto

// Leer el archivo JSON
const productosPath = path.join(__dirname, 'productos.json');
const productosData = fs.readFileSync(productosPath, 'utf-8');
const productos = JSON.parse(productosData);

// Insertar los datos en la colección
const cargarProductos = async () => {
  try {
    // Verificar si ya existen productos en la base de datos
    const productosExistentes = await Producto.find();
    if (productosExistentes.length === 0) {
      // Si no hay productos en la base de datos, cargar los productos
      await Producto.insertMany(productos);
      console.log('Productos insertados exitosamente');
    } else {
      console.log('Ya existen productos en la base de datos. No es necesario cargarlos nuevamente.');
    }
  } catch (err) {
    console.error('Error al insertar productos', err);
  }
};

module.exports = cargarProductos;

// Verificar si el archivo se ejecuta directamente
if (require.main === module) {
  cargarProductos();
}
