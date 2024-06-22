# E-commerce de Panadería

Bienvenidos al proyecto de E-commerce para una panadería. Este proyecto fue desarrollado como parte del Trabajo Práctico Final, utilizando tecnologías tanto del lado del servidor (back-end) como del cliente (front-end). A continuación, se detallan las funcionalidades implementadas, los requisitos técnicos y las instrucciones para ejecutar el proyecto.

## Descripción General

Este proyecto es una aplicación web para una panadería, que permite a los usuarios visualizar una lista de productos, agregar productos a un carrito de compras, y completar una compra. Además, incluye funcionalidades adicionales como el registro y login de usuarios, y un sistema de favoritos para mejorar la experiencia del usuario.

## Funcionalidades

### Funcionalidades Básicas

1. **Definición de Productos**:
   - Los productos de la panadería están definidos en un archivo JSON (`productos.json`), que contiene información detallada como el ID, nombre, descripción, precio y URL de la imagen de cada producto.

2. **Proyecto en Node.js**:
   - Utilicé Node.js para desarrollar el servidor del proyecto.
   - La información del archivo JSON se lee y se inserta en una base de datos MongoDB utilizando MongoDB Compass.

3. **Renderización de Productos**:
   - Los productos se renderizan en el DOM utilizando EJS.
   - Se aplicaron estilos CSS para asegurar una buena presentación visual de los productos.

4. **Carrito de Compras**:
   - Implementé un carrito de compras donde los usuarios pueden agregar productos.
   - Al finalizar la compra, se muestra un mensaje de "Compra hecha con éxito".

### Funcionalidades Adicionales

5. **Registro y Login**:
   - Implementé un sistema de registro y login para que los usuarios puedan acceder al e-commerce.
   - Las contraseñas se encriptan utilizando bcrypt y las sesiones se manejan con express-session.

6. **Listado de Favoritos**:
   - Los usuarios pueden agregar productos a un listado de favoritos.
   - El listado de favoritos se muestra en una página separada.

## Instrucciones para Ejecutar el Proyecto

### Requisitos Previos

- Node.js y npm instalados en el sistema.
- MongoDB instalado y configurado en el sistema o en un servicio de MongoDB en la nube.

### Pasos para Configurar y Ejecutar el Proyecto

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/ecommerce-panaderia.git
   cd ecommerce-panaderia
