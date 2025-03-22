import { Sequelize } from "sequelize-typescript";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from './product.repository';
import Product from "../../domain/entity/product";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/orderItem";
import OrderRepository from "./order.repository";

describe("Order Repository test", () => {
    let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderItemModel,
      OrderModel,
      CustomerModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

    it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,      
      2
    );
        
    const orderRepository = new OrderRepository();
    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);
    const total = order.total();

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });
      
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total,
      items: [
        {
          id: orderItem.id,
          product_id: product.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
        },
      ],
    });
  });
});