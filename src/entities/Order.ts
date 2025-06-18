import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { BoxRegal } from "./BoxRegal";
import { Box } from "./Box";

export enum OrderStatus {
  CREATED,
  DELIVERED_TO_BOX,
  PICKED_UP,
  NOT_PICKED_UP,
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column({ nullable: true })
  pin: string;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: OrderStatus;

  @OneToOne(() => BoxRegal, (boxRegal) => boxRegal.order)
  @JoinColumn()
  regal: BoxRegal;

  @ManyToOne(() => Box, (box) => box.orders, { onDelete: "CASCADE" })
  box: Box;
}
