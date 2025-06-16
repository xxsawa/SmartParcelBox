import { NextFunction, Request, Response } from "express";

function authentication(req: Request, res: Response, next: NextFunction) {
  next();
}

export default authentication;
