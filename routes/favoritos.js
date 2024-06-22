const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const Producto = require('../models/producto'); // Asegúrate de requerir el modelo Producto

// Ruta para agregar o quitar un producto de favoritos
router.post('/favorites/:id', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Usuario no autenticado');
  }

  const productId = req.params.id;

  try {
    const user = await Usuario.findById(req.session.user._id);
    if (!user.favorites) {
      user.favorites = []; // Asegúrate de que favorites esté inicializado
    }
    // Verificar si el producto ya está en favoritos
    const favoriteIndex = user.favorites.indexOf(productId);

    if (favoriteIndex !== -1) {
      // Si está, lo quitamos
      user.favorites.splice(favoriteIndex, 1);
    } else {
      // Si no está, lo agregamos
      user.favorites.push(productId);
    }

    await user.save();
    req.session.user = user; // Actualizar la sesión
    res.json({ favorites: user.favorites });
  } catch (err) {
    console.error('Error al actualizar favoritos', err);
    res.status(500).send('Error al actualizar favoritos');
  }
});

// Ruta para renderizar la página de favoritos
router.get('/favorites', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    const user = await Usuario.findById(req.session.user._id);
    const favoriteProducts = await Producto.find({ id: { $in: user.favorites } });
    res.render('favorites', { productos: favoriteProducts, user });
  } catch (err) {
    console.error('Error al obtener los productos favoritos', err);
    res.status(500).send('Error al obtener los productos favoritos');
  }
});

module.exports = router;
