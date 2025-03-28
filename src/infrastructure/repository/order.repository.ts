import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItem from "../../domain/entity/orderItem";

export default class OrderRepository implements OrderRepositoryInterface {
  
  async create(order: Order): Promise<void> {
    await OrderModel.create(
      {
        id: order.id,
        customer_id: order.customerId,
        total: order.total(),
        items: order.items.map((item) => ({
          id: item.id,
          product_id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel, as: "items" }],
      }
    );
  }
  
  async update(entity: Order): Promise<void> {
    const order = await OrderModel.findByPk(entity.id, {
      include: ["items"],
    });
    await order
      .update({
        total: entity.total(),
      })
      .then(() => {
        OrderItemModel.bulkCreate(
          entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            order_id: entity.id,
            product_id: item.productId,
          })),
          {
            updateOnDuplicate: ["name", "price", "quantity", "product_id"],
          }
        );
      });
  }

  async find(id: string): Promise<Order> {
    let orderModel;
   try {
    orderModel = await OrderModel.findOne({
      where: { id: id },
      include: ["items"],
    });
     } catch (error) {
              throw new Error("Order not found");
          }
   
    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((item) => 
        new OrderItem(
          item.id,
          item.product_id,
          item.name,
          item.price,
          item.quantity
        )
      ));
  }
  
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ["items"] });
    return orderModels.map((orderModel) => 
      new Order(
        orderModel.id,
        orderModel.customer_id,
        orderModel.items.map((item) => 
          new OrderItem(
            item.id,
            item.product_id,
            item.name,
            item.price,
            item.quantity
          )
        )
      )
    );
  }
}