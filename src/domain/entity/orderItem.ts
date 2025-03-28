export default class OrderItem {

    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number
    private _quantity: number;

    constructor(id: string, productId: string, name: string, price: number, quantity: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._productId = productId;
        this.validate();
    }
    
    validate() {
        if (this._quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }
    }

    get id() {
        return this._id;
    }
    
    get price() {
        return this._price;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }
    
    get name() {
        return this._name;
    }

    get quantity() {
        return this._quantity;
    }

    get productId() {
        return this._productId;
    }
}