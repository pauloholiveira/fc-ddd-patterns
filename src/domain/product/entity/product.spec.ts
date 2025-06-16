import Product from './product';

describe('Product unit tests', () => {

    it('should throw error when id is empty', () => {
        expect(() => {
            let product = new Product("", "name", 10);
        }).toThrowError("Id is required");
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            let product = new Product("1", "", 10);
        }).toThrowError("Name is required");
    });

    it('should throw error when price is less than zero', () => {
        expect(() => {
            let product = new Product("1", "name", -1);
        }).toThrowError("Price is required");
    });

    it('should throw error when price is zero', () => {
        expect(() => {
            let product = new Product("1", "name", 0);
        }).toThrowError("Price is required");
    });

    it('should be grant then zero', () => {
        let product = new Product("1", "name", 10);
        expect(product.price).toBe(10);
    });

    it('should change name', () => {
        //Arrange
        const product = new Product("1", "name", 10);

        //Act
        product.changeName("new name");

        //Assert
        expect(product.name).toBe("new name");
    });
        
    it('should change price', () => {
        //Arrange
        const product = new Product("1", "name", 100);

        //Act
        product.changePrice(150);

        //Assert
        expect(product.price).toBe(150);
    });
});
