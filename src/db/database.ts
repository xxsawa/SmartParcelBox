import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Box } from "../entities/Box";
import { Order } from "../entities/Order";
import { BoxRegal } from "../entities/BoxRegal";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5555,
  username: "postgres",
  password: "password",
  database: "postgres",
  synchronize: true,
  entities: [User, Box, Order, BoxRegal],
  logging: false,
});

export default AppDataSource;
