const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// Ruta para la página de registro
router.get('/register', (req, res) => {
  res.render('register', { user: req.session.user });
});


// Ruta para manejar el registro
router.post('/register', async (req, res) => {
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

// Ruta para la página de login
router.get('/login', (req, res) => {
  res.render('login', { user: req.session.user });
});

// Ruta para manejar el login
router.post('/login', async (req, res) => {
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

// Ruta para manejar el logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
