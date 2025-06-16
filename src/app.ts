import express from "express";
import requestLogging from "./middleware/request-logging";
import AppDataSource from "./db/database";
import router from "./routes/mainRouter.ts";
import verifyToken from "./middleware/authentication/index.ts";

const app = express();
const port = 3000;

// DB
AppDataSource.initialize()
  .then(() => {
    console.log("DB connection succesfull!");
  })
  .catch((err) => console.error(err));

// Middleware
if (process.env.REQUEST_LOGGING) {
  app.use(requestLogging);
}
app.use(express.json());

// Routers
app.use("/api", router);

app.get("/", verifyToken, (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
