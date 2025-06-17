import Order from "../entity/order";
import OrderItem from "../entity/orderItem";


interface OrderFactoryProps{
    id: string; // Optional, will be generated if not provided
    customerId: string;
    items: {
        id: string; // Unique identifier for the item
        productId: string; // ID of the product being ordered
        name: string; // Name of the product
        price: number; // Price of the product
        quantity: number; // Quantity of the product ordered        
    }[];
} // Assuming products is an array of objects with at least an id and price

export default class OrderFactory {

    public static create(props: OrderFactoryProps): Order {
        const items = props.items.map((item) => {
            return new OrderItem(
                item.id,
                item.productId,
                item.name,
                item.price,
                item.quantity                
            );
        });

        return new Order(props.id, props.customerId, items);
    }
}