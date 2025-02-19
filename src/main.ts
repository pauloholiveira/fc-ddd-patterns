import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import { OrderItem } from "./entity/orderItem";

let customer = new Customer("123", "Wesley Willians");
const address = new Address("Rua 1", 123, "12345-678", "São Paulo");

customer.address = address;
customer.activate();

//Relacao por id
const item1 = new OrderItem("1", "p1", "Item 1", 100, 2);
const item2 = new OrderItem("2", "p2", "Item 2", 100, 2);
const order = new Order("1", customer.id, [item1, item2]);

