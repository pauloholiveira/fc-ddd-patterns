import Product from "../entity/product";

//Domain service não guarda estado, apenas manipula entidades e objetos de valor
//Não é necessário instanciar a classe para usar os métodos


export class ProductService {
    
    constructor() {
        // Initialization code here
    }

    // Add your methods here
    static increasePrice(products: Product[], percentage: number): void {
        products.forEach(product => {
            product.changePrice(product.price + (product.price * percentage / 100));
        });
    }

}