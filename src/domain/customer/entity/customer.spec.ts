import Address from "../value-object/address";
import Customer from "./customer";

describe('Customer unit tests', () => {

    it('should throw error when id is empty', () => {
        expect(() => {
            let customer = new Customer("", "name");
        }).toThrowError("ID is required");
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    });
    
    it('should change name', () => {
        //Arrange
        const customer = new Customer("123", "John");

        //Act
        customer.changeName("Paulo");

        //Assert
        expect(customer.name).toBe("Paulo");
    });

    it('should activate customer', () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua 1", 123, "12345-678", "São Paulo");
        customer.changeAddress(address);
        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it('should deactivate customer', () => {
        const customer = new Customer("1", "Customer 1");
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it('should throw error when address is undefined', () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is required");
    });
});
