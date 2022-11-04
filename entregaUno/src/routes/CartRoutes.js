const express = require('express');
const { Router } = express;
const cartRouter = Router();

const { ProductContainer } = require('../models/ProductContainer');
const { CartContainer } = require('../models/CartContainer');

let productContainer = new ProductContainer();
let cartContainer = new CartContainer();

cartRouter.get('/', (req, res) => {
    let carts = cartContainer.getAll();
    res.json({carts: carts});
});
cartRouter.get('/:id', (req, res) => {
    let id = Number(req.params.id);
    let cart = cartContainer.getById(id);
    if(cart.hasOwnProperty('id')) {
    res.json({cart: cart.products});
    } else {
        res.status(404).json({message: 'Cart not found'});
    }
});

cartRouter.post('/', (req, res) => {
try{
     let cart = cartContainer.save();
        res.json({result: 'cart saved', cart: cart});
    } catch {
        res.json({result: 'cart cannot saved'});
    }
});

cartRouter.post('/:id/products', (req, res) => {
    let cartId = req.params.id;
    let product = productContainer.getById(req.body.id);

    if (cartId && product) {
        let cart = cartContainer.addProductToCart(cartId, product);
        
        res.json({result: 'product added to cart', cart: cart});
    } else {
        res.json({result: 'product cannot be added'});
    }
});
cartRouter.delete('/:id', (req, res) => {
    try{
    let id = Number(req.params.id);
    let cart = cartContainer.deleteById(id);
  
        res.json({result: 'cart deleted', cart: cart});
    } catch {
        res.json({result: 'cart cannot deleted'});
    }
});
cartRouter.delete('/:id/products/:productId', (req, res) => {
    try{
    let cartId = req.params.id;
    let productId = req.params.productId;
    let cart = cartContainer.deleteByIdProduct(cartId, productId);
    if(cart.hasOwnProperty('id')) {
        res.json({result: 'product deleted', cart: cart});
    } else {
        res.status(404).json({message: 'Cart not found'});
    }
    } catch {
        res.json({result: 'product cannot deleted'});
    }
});

module.exports = cartRouter;