import Order from "./order";
import OrderItem from "./orderItem";


describe('Order unit tests', () => {

    it('should throw error when id is empty', () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("ID is required");
    });

    it('should throw error when customer_id is empty', () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("CustomerId is required");
    });

    it('should throw error when customer_id is empty', () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("Itens are required");
    });

    it('should calculate total', () => {
        //Arrange

        const item1 = new OrderItem("1", "p1", "item 1", 100, 2);
        const item2 = new OrderItem("2", "p2", "item 2", 200, 2);
        const order = new Order("123", "123", [item1]);

        //Act
        let total = order.total();
        //Assert
        expect(total).toBe(200);

        //Act
        const order2 = new Order("123", "123", [item1, item2]);
        total = order2.total();

        //Assert
        expect(total).toBe(600);
    });

    it('should throw error if the item quantity is less or equal than 0', () => {
        expect(() => {
            const item1 = new OrderItem("1", "p1", "item 1", 100, 0);
            const order = new Order("123", "123", [item1]);
        }).toThrowError("Quantity must be greater than 0");
    });

});
