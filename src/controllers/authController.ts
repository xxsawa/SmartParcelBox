import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../repositories/userRepository";
import { User } from "../entities/User";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as User;
    if (email && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await createUser({ email: email, password: hashedPassword });
      res.status(201).json({ message: "User registered successfully" });
      return;
    }
    throw Error;
  } catch (error) {
    res.status(500).json({ error: "Registration failed" + error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as User;
    const user = await findUserByEmail(email);
    console.log(user);
    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }
    const token = jwt.sign({ userId: user.id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
