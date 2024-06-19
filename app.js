const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const connectDB = require('./db');
const cargarProductos = require('./cargarProductos');

// Inicializo Express
const app = express();

// Conectar a MongoDB y cargar productos
connectDB().then(() => {
  cargarProductos();
});

// Configuración de sesiones
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Debería ser 'true' en producción con HTTPS
}));

// Configuración de middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Middleware para inicializar el carrito en la sesión si no existe
app.use((req, res, next) => {
  if (!req.session.cart) {
      req.session.cart = [];
  }
  next();
});

// Middleware para pasar la variable user a las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Configuración de rutas
const productosRoutes = require('./routes/productos');
const carritoRoutes = require('./routes/carrito');
const usuariosRoutes = require('./routes/usuarios');

app.use('/', productosRoutes);
app.use('/', carritoRoutes);
app.use('/', usuariosRoutes);

// Puerto de escucha del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
