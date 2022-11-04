const { Container } = require('./Container');

class CartContainer extends Container {
    constructor() {
        super('./src/data/carts.json');
        let carts = this.getAll();
        this.id = (carts.length > 0) ? carts.length + 1 : 1;
    }

    save() {
        let carts = this.getAll();
        let cart = {id:this.id, timestamp: new Date().toLocaleDateString(), products:[]}
        carts.push(cart);
        this.saveInFile(carts);
        this.id++;

        return cart;
    }

    getAll() {
        let carts = this.getContentFile();

        return carts;
    }

    getById(id) {
        let carts = this.getAll();
        let cart = null;

        if(carts.length > 0) {
            let element = carts.find(elem => Number(elem.id) == id);
            if(element) {
                cart = element;
            }
        }

        return cart;
    }

    addProductToCart(cartId, product) {
        let carts = this.getAll();
        let cart = null;

        if(carts.length > 0) {
            let element = carts.find(elem => elem.id == cartId);
            if(element) {
                element.products.push(product);
                cart = element;
            }

            this.saveInFile(carts);
        }

        return cart;
    }
    deleteById(id) {
        try{
        let carts = this.getAll();
        let cartDeleted = carts.filter(cart => Number(cart.id) !== id)
        if(cartDeleted.length < carts.length){
            this.saveInFile(cartDeleted);
            return 'id eliminado'+ id
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}
    deleteAll(){
        this.saveInFile([]);
    }
    deleteByIdProduct (cartId, productId){
        try{
            let carts = this.getAll();
            let cart = null;
            if(carts.length > 0) {
            let element = carts.find(elem => elem.id == cartId);
            if(element) {
                let products = element.products;
                let product = products.find(elem => elem.id == productId);
                if(product){
                    products = products.filter(elem => elem.id != productId);
                    element.products = products;
                    cart = element;
                }
                this.saveInFile(carts);
                return cart;
            }
        }
        } catch (error) {
            console.log("Error: ", error);
        }
    }



}

module.exports = { CartContainer }