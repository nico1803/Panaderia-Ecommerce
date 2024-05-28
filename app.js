const express = require('express');
const bodyParser = require('body-parser'); // Este módulo me ayuda a manejar los datos enviados desde los formularios HTML.
const path = require('path'); // Este módulo me ayuda a trabajar con rutas de archivos y directorios.
const morgan = require('morgan'); // Importe morgan

// Inicializo Express
const app = express(); // Inicializo Express y lo guardo en la variable 'app'.

// Configuro EJS como motor de plantillas
app.set('view engine', 'ejs'); // Configuro Express para usar EJS como motor de plantillas.
app.set('views', path.join(__dirname, 'views')); // Configuro la carpeta donde se encuentran mis vistas.

// Middleware para el manejo de datos JSON y formularios
app.use(bodyParser.json()); // Aplico el middleware bodyParser para manejar datos JSON.
app.use(bodyParser.urlencoded({ extended: true })); // Aplico el middleware bodyParser para manejar datos de formularios HTML.
app.use(morgan('dev')); // Aplico el middleware Morgan para el registro de solicitudes HTTP en modo de desarrollo

// Defino las rutas
app.get('/', (req, res) => { // Defino una ruta para la página de inicio ('/'). Cuando un usuario visita esta ruta, se ejecuta esta función.
  res.render('index'); // Respondo a la solicitud renderizando la vista 'index.ejs' y enviándola al cliente.
});

// Puerto de nescucha del servidor
const PORT = process.env.PORT || 3000; // Configuro el puerto en el que mi servidor escuchará las solicitudes.
app.listen(PORT, () => { // Hago que mi servidor escuche en el puerto especificado.
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`); // Imprimo un mensaje en la consola para indicar que el servidor está en funcionamiento.
});