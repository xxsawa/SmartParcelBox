import AppDataSource from "../db/database";
import { Order } from "../entities/Order";

const orderRepo = AppDataSource.getRepository(Order);

export const findOrderByNumber = async (id: number) => {
  return await orderRepo.findOneOrFail({
    where: { id: id },
    relations: ["box", "regal"],
  });
};

export const updateOrder = async (order: Order) => {
  return await orderRepo.save(order);
};
