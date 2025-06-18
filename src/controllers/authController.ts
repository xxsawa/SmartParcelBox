import { Request, Response } from "express";
import { User } from "../entities/User";
import { loginUser, registerUser } from "../services/authService";

export const postRegister = async (req: Request, res: Response) => {
  try {
    registerUser(req.body as User);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed " + error });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  try {
    const token = await loginUser(req.body as User);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
