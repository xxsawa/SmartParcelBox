import AppDataSource from "../db/database";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

export const createUser = async (userData: Partial<User>) => {
  const user = userRepo.create(userData);
  return await userRepo.save(user);
};

export const findUserByEmail = async (email: string) => {
  return await userRepo.findOneBy({ email });
};

export const findUserById = async (id: number) => {
  return await userRepo.findOneBy({ id });
};
