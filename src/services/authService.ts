import { User } from "../entities/User";
import * as userRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (userData: Partial<User>) => {
  const { email, password } = userData;
  if (email && password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await userRepository.createUser({
      email: email,
      password: hashedPassword,
    });
  }
  throw Error;
};

export const loginUser = async (userData: User) => {
  const { email, password } = userData;
  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw Error;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw Error;
  }

  return jwt.sign({ userId: user.id }, "your-secret-key", {
    expiresIn: "1h",
  });
};
