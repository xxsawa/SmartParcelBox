import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Geometry,
  OneToMany,
  OneToOne,
} from "typeorm";
import { BoxRegal } from "./BoxRegal";
import { Order } from "./Order";

@Entity()
export class Box {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  box_name: string;

  @Column("geometry", { spatialFeatureType: "Point", srid: 4326 })
  location: Geometry;

  @OneToMany(() => BoxRegal, (regal) => regal.box)
  regals: BoxRegal[];

  @OneToMany(() => Order, (order) => order.box)
  orders: Order[];
}
