import OrderItem from './orderItem';

export default class Order {
    private _id!: string;
    private _customerId!: string; // se for agregados diferentes, pega o ID
    private _items: OrderItem[] = []; //se for o mesmo agregado pega o objeto
    private _total: number = 0;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    validate(): boolean{
        if (this._id.length === 0) {
            throw new Error("ID is required");
        }
        if (this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }

        if (this._items.length === 0) {
            throw new Error("Itens are required");
        }

        if (this._items.some(item => item.quantity <= 0)) {
            throw new Error("Quantity must be greater than 0");
        }
        return true;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }

    get id() {
        return this._id;
    }

    get customerId() {
        return this._customerId;
    }

    get items() {
        return this._items;
    }
}