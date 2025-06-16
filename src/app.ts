import express from "express";
import requestLogging from "./middleware/request-logging";
import authentication from "./middleware/authentication";
import pool from "./db";

const app = express();
const port = 3000;

// Middleware
if (process.env.REQUEST_LOGGING) {
  app.use(requestLogging);
}

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
