import ProductFactory from "./product.factory";

describe("ProductFactory unit tests", () => {
    it("should create a product type A", () => {
        const product = ProductFactory.create("a", "Product A", 1);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product");
        
    });

    it("should create a product type B", () => {
        const product = ProductFactory.create("b", "Product B",2);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(4);
        expect(product.constructor.name).toBe("ProductB");
    });

    it("should throw an error for unsupported product type", () => {
        expect(() => {
            ProductFactory.create("c", "Product C", 3);
        }).toThrowError("Product type no Supported");
    }); // Adding a timeout to ensure the test doesn't hang indefinitely
})  