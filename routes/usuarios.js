const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario'); // Importar el modelo de Usuario
const bcrypt = require('bcrypt');

// Ruta para la página de registro
router.get('/register', (req, res) => {
  res.render('register', { user: req.session.user });
});

// Ruta para manejar el registro de usuarios
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Verificar si ya existe un usuario con el mismo nombre de usuario
    const existingUser = await Usuario.findOne({ username });
    if (existingUser) {
      return res.status(400).send('El nombre de usuario ya está en uso');
    }
    // Crear un nuevo usuario
    const newUser = new Usuario({ username, password });
    await newUser.save();
    res.redirect('/login'); // Redirigir al usuario a la página de inicio de sesión
  } catch (err) {
    console.error('Error al registrar usuario', err);
    res.status(500).send('Error al registrar usuario');
  }
});

// Ruta para la página de inicio de sesión
router.get('/login', (req, res) => {
  res.render('login', { user: req.session.user });
});

// Ruta para manejar el inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Buscar al usuario por su nombre de usuario
    const user = await Usuario.findOne({ username });
    if (!user) {
      return res.status(400).send('Nombre de usuario o contraseña incorrectos');
    }
    // Comparar la contraseña ingresada con la almacenada en la base de datos
    user.comparePassword(password, (err, isMatch) => {
      if (err) return res.status(500).send('Error al comparar contraseñas');
      if (!isMatch) return res.status(400).send('Nombre de usuario o contraseña incorrectos');
      // Iniciar sesión almacenando al usuario en la sesión
      req.session.user = user;
      res.redirect('/'); // Redirigir al usuario a la página principal o a donde desees
    });
  } catch (err) {
    console.error('Error al hacer login', err);
    res.status(500).send('Error al hacer login');
  }
});

// Ruta para manejar el cierre de sesión
router.get('/logout', (req, res) => {
  req.session.destroy(); // Destruir la sesión
  res.redirect('/'); // Redirigir al usuario a la página principal o a donde desees
});

module.exports = router;
