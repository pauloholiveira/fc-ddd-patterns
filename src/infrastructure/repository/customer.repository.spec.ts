import { Sequelize } from "sequelize-typescript";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";

describe("CustomerRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer");
        
        customer.changeAddress(new Address("Street", 123, "City", "000000000"));
        
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findByPk("1");
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer",
            zipCode: "000000000",
            street: "Street",
            number: 123,
            city: "City",
            rewardPoints: 0,
            active: true
        });        
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer");
        customer.changeAddress(new Address("Street", 123, "City", "000000000"));
        
        await customerRepository.create(customer);

        customer.changeName("Customer Novo");
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findByPk("1");
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer Novo",
            zipCode: "000000000",
            street: "Street",
            number: 123,
            city: "City",
            rewardPoints: 0,
            active: true
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer");
        customer.changeAddress(new Address("Street", 123, "City", "000000000"));
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
        
        const foundCustomer = await customerRepository.find("1");

        expect(customerModel.toJSON()).toStrictEqual({
            id: foundCustomer.id,
            name: foundCustomer.name,
            zipCode: foundCustomer.address.zipCode,
            street: foundCustomer.address.street,
            number: foundCustomer.address.number,
            city: foundCustomer.address.city,
            rewardPoints: foundCustomer.rewardPoints,
            active: foundCustomer.isActive()
        });
    });

    it("should throw a error when a customer si not found", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer");
        customer.changeAddress(new Address("Street", 123, "City", "000000000"));
        await customerRepository.create(customer);

        expect(async () => {
            const customerRepository = new CustomerRepository();
            await customerRepository.find("2");
        }).rejects.toThrow("Customer not found");
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Customer 1");
        customer1.changeAddress(new Address("Street", 123, "City", "000000000"));
        customer1.addRewardPoints(10);
        await customerRepository.create(customer1);

        const customer2 = new Customer("2", "Customer 2");
        customer2.changeAddress(new Address("Street", 123, "City", "000000000"));
        customer2.addRewardPoints(20);
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();
        const products = [customer1, customer2];

        expect(foundCustomers).toEqual(products);
    });

});