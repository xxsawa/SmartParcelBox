import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5555,
  username: "postgres",
  password: "password",
  database: "postgres",
  synchronize: true,
  entities: [User],
  logging: false,
});

export default AppDataSource;
