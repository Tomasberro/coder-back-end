const express = require('express');
const { Router } = express;
const productRouter = Router();

const { ProductContainer } = require('../models/ProductContainer');
let productContainer = new ProductContainer();

// function SecurityMiddleware(req,res,next) {
    
//     let admin = req.headers.admin;

//     if(admin) {
//         next();
//     } else {
//         res.json({error: -1, descripcion:`ruta ${req.originalUrl}  y metodo ${req.method}  no permitidos`});
//     }

//     //next();
// }
productRouter.get('/', (req, res) => {
    let products = productContainer.getAll();

    res.json({products: products});
});
productRouter.get('/:id', (req, res) => {
  try{
        let id = req.params.id;
        let product = productContainer.getById(id);
        res.json({product: product});
    } catch {
        res.json({result: 'product not found'});
    }
});

productRouter.post('/', (req, res) => {
    let product = req.body;

    if (product && product.name && product.description && product.price && product.stock
        && product.url && product.code) {
        product = productContainer.save(product.name, product.description, product.code, 
            product.url, product.price, product.stock);
        res.json({result: 'product saved', product: product});
    } else {
        res.json({result: 'product cannot saved'});
    }
});
productRouter.put('/:id', (req, res) => {
    let id = req.params.id;
    let product = req.body;
    try{
        product = productContainer.update(id, product);
        res.json({result: 'product updated', product: product});
    }
    catch{
        res.json({result: 'product cannot updated'});
    }
});
productRouter.delete('/:id', (req, res) => {
    let id = Number(req.params.id);
    try{
        let borrado = productContainer.deleteById(id);
        res.json({result: 'product deleted', borrado: borrado});
    }
    catch{
        res.json({result: 'product cannot deleted'});
    }
});

module.exports = productRouter;