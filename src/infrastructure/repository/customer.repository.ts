
import Address from "../../domain/customer/value-object/address";
import Customer from "../../domain/customer/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer-repository.interface";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(customer: Customer): Promise<void> {
        await CustomerModel.create({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            city: customer.address.city,
            number: customer.address.number,
            zipCode: customer.address.zipCode,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        });
    }

    async find(id: string): Promise<Customer> {
        let customerModel;

        try {
            customerModel = await CustomerModel.findOne({
                where: {
                    id: id,
                },
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Customer not found");
        }

        const customer = new Customer(customerModel.id, customerModel.name)
        customer.changeAddress(new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.zipCode));
        customer.addRewardPoints(customerModel.rewardPoints);
        customerModel.active ? customer.activate() : customer.deactivate();

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map((customerModel) => {
            const c = new Customer(customerModel.id, customerModel.name);
            c.changeAddress(new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.zipCode));
            c.addRewardPoints(customerModel.rewardPoints);
            customerModel.active ? c.activate() : c.deactivate();   
            return c;
        });
    }

    async update(customer: Customer): Promise<void> {

        await CustomerModel.update(
                {   name: customer.name,
                    street: customer.address.street,
                    city: customer.address.city,
                    number: customer.address.number,
                    zipCode: customer.address.zipCode,
                    active: customer.isActive(),
                    rewardPoints: customer.rewardPoints,
                },
                {
                    where: {
                        id: customer.id
                    }
                } 
                
                );
    }
}
