const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./db'); // Importa la función para conectar a MongoDB
const cargarProductos = require('./cargarProductos'); // Importa la función cargarProductos
const Producto = require('./models/producto'); // Importa el modelo de Producto

// Inicializo Express
const app = express();

// Conectar a MongoDB
connectDB().then(() => {
  // Cargar productos después de conectar a la base de datos
  cargarProductos();
});

// Configuro EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para el manejo de datos JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Defino las rutas
app.get('/', async (req, res) => {
  try {
    const productos = await Producto.find(); // Obtiene todos los productos desde la base de datos
    res.render('index', { productos }); // Renderiza la vista 'index.ejs' y envía los productos
  } catch (err) {
    console.error('Error al obtener productos', err);
    res.status(500).send('Error al obtener productos');
  }
});

// Puerto de escucha del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
