const express = require('express');
const app = express();
const productRouter = require('./src/routes/ProductRoutes');
const cartRouter = require('./src/routes/CartRoutes');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.all('*', function(req, res){
    res.status(404).send({"error":`404`,"descripcion":`ruta ${req.originalUrl} y
     método ${req.method} no implementados`});
});

app.listen(8080, () => {
    console.log('Server on port 8080');
})