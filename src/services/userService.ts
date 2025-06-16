import * as userRepository from "../repositories/userRepository";

export const registerUser = async (userData: any) => {
  return await userRepository.createUser(userData);
};
