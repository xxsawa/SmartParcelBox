import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToOne,
} from "typeorm";
import { Box } from "./Box";
import { Order } from "./Order";

@Entity()
export class BoxRegal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column({ default: false })
  open: boolean;

  @ManyToOne(() => Box, (box) => box.regals, { onDelete: "CASCADE" })
  box: Box;

  @OneToOne(() => Order, (order) => order.regal)
  order: Order;
}
