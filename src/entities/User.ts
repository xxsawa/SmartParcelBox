import { Column, Entity, Generated, PrimaryColumn, Unique } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  @Generated()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;
}
