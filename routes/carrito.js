const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

// Añadir al carrito
router.post('/add-to-cart', async (req, res) => {
    const { productoId, quantity } = req.body;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    try {
        const product = await Producto.findOne({ id: productoId });
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        const existingProductIndex = req.session.cart.findIndex(item => item.product.id === parseInt(productoId, 10));

        if (existingProductIndex > -1) {
            req.session.cart[existingProductIndex].quantity += parseInt(quantity, 10);
        } else {
            req.session.cart.push({ product, quantity: parseInt(quantity, 10) });
        }

        // Redirige de vuelta a la página desde donde se hizo la solicitud
        res.redirect(req.headers.referer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al añadir el producto al carrito');
    }
});


// Quitar del carrito
router.post('/remove-from-cart', (req, res) => {
    const { productoId, quantity } = req.body;

    if (!req.session.cart) {
        return res.redirect('/cart');
    }

    const existingProductIndex = req.session.cart.findIndex(item => item.product.id === parseInt(productoId, 10));

    if (existingProductIndex > -1) {
        req.session.cart[existingProductIndex].quantity -= parseInt(quantity, 10);
        if (req.session.cart[existingProductIndex].quantity <= 0) {
            req.session.cart.splice(existingProductIndex, 1);
        }
    }

    res.redirect('/cart');
});

// Ver el carrito
router.get('/cart', (req, res) => {
    res.render('cart', { cart: req.session.cart || [] });
});

// Borrar el carrito
router.post('/cart', (req, res) => {
    req.session.cart = [];
    res.status(200).send('Carrito eliminado');
});

// Ruta de finalización de compra
router.post('/checkout', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login?message=Debes%20iniciar%20sesión%20para%20completar%20la%20compra');
    }
    req.session.cart = [];
    res.render('success', { message: 'Compra hecha con éxito' });
});

// Añadir al carrito desde el carrito
router.post('/cart/add-to-cart', async (req, res) => {
    const { productoId, quantity } = req.body;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    try {
        const product = await Producto.findOne({ id: productoId });
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        const existingProductIndex = req.session.cart.findIndex(item => item.product.id === parseInt(productoId, 10));

        if (existingProductIndex > -1) {
            req.session.cart[existingProductIndex].quantity += parseInt(quantity, 10);
        } else {
            req.session.cart.push({ product, quantity: parseInt(quantity, 10) });
        }

        res.redirect('/cart'); // Redirige de vuelta al carrito
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al añadir el producto al carrito');
    }
});

// Quitar del carrito desde el carrito
router.post('/cart/remove-from-cart', (req, res) => {
    const { productoId, quantity } = req.body;

    if (!req.session.cart) {
        return res.redirect('/cart');
    }

    const existingProductIndex = req.session.cart.findIndex(item => item.product.id === parseInt(productoId, 10));

    if (existingProductIndex > -1) {
        req.session.cart[existingProductIndex].quantity -= parseInt(quantity, 10);
        if (req.session.cart[existingProductIndex].quantity <= 0) {
            req.session.cart.splice(existingProductIndex, 1);
        }
    }

    res.redirect('/cart');
});

module.exports = router;
