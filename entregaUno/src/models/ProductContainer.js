const { Container } = require('./Container');

class ProductContainer extends Container {
    constructor() {
        super('./src/data/products.json');
        let products = this.getAll();
        this.id = (products.length > 0) ? products.length + 1 : 1;
    }

    save( name, description, code, url, price, stock) {
        let products = this.getAll();
        let product = {id:this.id, name: name, timestamp: new Date().toLocaleDateString(), description, 
        code, url, price, stock}
        products.push(product);
        this.saveInFile(products);
        this.id++;
    }

    getAll() {
        let products = this.getContentFile();

        return products;
    }

    getById(id) {
        let products = this.getAll();
        let product = null;

        if(products.length > 0) {
            let element = products.find(elem => elem.id == id);
            if(element) {
                product = element;
            }
        }

        return product;
    }
    deleteById(id) {
     try {
        let products = this.getAll();
        let filtrado = products.filter(producto => Number(producto.id) !== id)
        //[1, 2, 3] delete(2) [1, 3]
        if(filtrado.length < products.length){
        this.saveInFile(filtrado);
        return 'id eliminado'+ id
        }
    } catch (error) {
        console.log("Error: ", error);

        console.log("No se encuentra lo solicitado");

    }
}
deleteAll(){
        this.saveInFile([]);
    }
update(id, obj){
        let products = this.getAll();
        const index = products.findIndex( objT => objT.id == id);
        obj.id = products[index].id
        products[index] = obj;
        this.saveInFile(products);
        return obj;
    }
}

module.exports = { ProductContainer }