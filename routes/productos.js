const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render('index', { productos }); // Aquí enviamos 'productos' a la vista
  } catch (error) {
    console.error('Error al obtener productos', error);
    res.status(500).send('Error al obtener productos');
  }
});


module.exports = router;
