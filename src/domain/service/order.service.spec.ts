import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("1", "p1", "Item 1", 10, 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });

    it("should get total of all orders", () => {
        const item1 = new OrderItem("1", "1", "Item 1", 100, 1);
        const order1 = new Order("1", "customer1", [item1]);

        const item2 = new OrderItem("2", "2", "Item 2", 200, 2);
        const order2 = new Order("2", "customer2", [item2]);
        
        const totalPrice = OrderService.total([order1, order2]);

        expect(totalPrice).toBe(500);
    });

    it("should add reward points to customer", () => {
        const customer = new Customer("c1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});