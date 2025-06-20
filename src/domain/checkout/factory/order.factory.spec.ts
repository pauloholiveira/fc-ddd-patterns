import { v4 as uuid } from "uuid";
import Order from "../entity/order";
import OrderFactory from "./order.factory";
describe("Order factory unit tests", () => {
    it("should create an order", () => {
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    productId: uuid(),
                    name: "Product 1",
                    price: 100,
                    quantity: 1
                }
            ]
        }

        const order = OrderFactory.create(orderProps);
        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(1);
    });
})