import { Table, Model, PrimaryKey, Column, HasMany } from "sequelize-typescript";
import OrderItemModel from "./order-item.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare customer_id: string;

  @Column({ allowNull: false })
  declare total: number;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];
}