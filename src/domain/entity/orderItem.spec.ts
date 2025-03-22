import OrderItem from "./orderItem";


describe('Order unit tests', () => {

    it('should throw error if the item quantity is less or equal than 0', () => {
        expect(() => {
            const item1 = new OrderItem("1", "p1", "item 1", 100, 0);
        }).toThrowError("Quantity must be greater than 0");
    });

});
