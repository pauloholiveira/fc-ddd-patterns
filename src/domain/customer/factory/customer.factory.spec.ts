import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit tests", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("John");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();
        expect(customer.constructor.name).toBe("Customer");
    });
    
    it("should create a customer with an address", () => {
        const address = new Address("123 Main St", 123, "City", "12345");
        const customer = CustomerFactory.createWithAddress("John", address);
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBe(address);
    });

})