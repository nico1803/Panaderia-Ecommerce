const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const bcrypt = require('bcrypt');
const connectDB = require('./db');
const cargarProductos = require('./cargarProductos');
const Producto = require('./models/producto');
const Usuario = require('./models/usuario'); // Importa el modelo de Usuario

const app = express();

connectDB().then(() => {
  cargarProductos();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Debería ser 'true' en producción con HTTPS
}));

const carrito = [];

app.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render('index', { productos, user: req.session.user });
  } catch (err) {
    console.error('Error al obtener productos', err);
    res.status(500).send('Error al obtener productos');
  }
});

app.post('/add-to-cart', async (req, res) => {
  try {
    const productoId = req.body.productoId;
    const producto = await Producto.findOne({ id: productoId });
    if (producto) {
      const carritoProducto = carrito.find(p => p.producto.id == productoId);
      if (carritoProducto) {
        carritoProducto.cantidad += 1;
      } else {
        carrito.push({ producto, cantidad: 1 });
      }
    }
    res.redirect('/');
  } catch (err) {
    console.error('Error al agregar producto al carrito', err);
    res.status(500).send('Error al agregar producto al carrito');
  }
});

app.get('/cart', (req, res) => {
  res.render('cart', { carrito, user: req.session.user });
});

app.post('/checkout', (req, res) => {
  carrito.length = 0;
  res.send('Compra hecha con éxito');
});

// Rutas de registro y login
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new Usuario({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error('Error al registrar usuario', err);
    res.status(500).send('Error al registrar usuario');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Usuario.findOne({ username });
    if (!user) {
      return res.status(400).send('Usuario no encontrado');
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) return res.status(500).send('Error al comparar contraseñas');
      if (!isMatch) return res.status(400).send('Contraseña incorrecta');
      req.session.user = user;
      res.redirect('/');
    });
  } catch (err) {
    console.error('Error al hacer login', err);
    res.status(500).send('Error al hacer login');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
