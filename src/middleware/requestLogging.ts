import { NextFunction, Request, Response } from "express";

function requestLogging(req: Request, res: Response, next: NextFunction) {
  console.log("\x1b[32m", "----------- Req info -----------");
  console.log(req.method + " " + req.originalUrl);
  console.log("\x1b[32m", "Request body:", req.body ?? "");

  const originalSend = res.send;

  res.send = function (body: any) {
    console.log("\x1b[36m", "----------- Res info -----------");
    console.log("Status code: " + res.statusCode);
    console.log("\x1b[36m", "Response body:", body ?? "");
    return originalSend.call(this, body);
  };

  next();
}

export default requestLogging;
