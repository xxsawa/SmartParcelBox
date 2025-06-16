import { NextFunction, Request, Response } from "express";

function requestLogging(req: Request, res: Response, next: NextFunction) {
  const originalSend = res.send;

  console.log("----------- Req info -----------");
  console.log(req.method + " " + req.originalUrl);
  console.log("Request body:", req.body ?? "");

  res.send = function (body: any) {
    console.log("----------- Res info -----------");
    console.log("Status code: " + res.statusCode);
    console.log("Response body:", body ?? "");
    return originalSend.call(this, body);
  };

  next();
}

export default requestLogging;
