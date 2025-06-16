import { Request, Response } from "express";
import { findUserById } from "../repositories/userRepository";

export const getUser = async (req: Request, res: Response) => {
  const user = await findUserById(parseInt(req.params.id));
  res.json({ user: user });
};

export const saveUser = async (req: Request, res: Response) => {
  res.json({ user: "user" });
};
