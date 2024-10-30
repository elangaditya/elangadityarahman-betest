import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import bodyParser from "body-parser";
import { connectDb, redisClient } from "./db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDb();
redisClient.connect();

app.get("/", (req: Request, res: Response) => {
  res.send("Code.ID Backend Test Server");
});

app.use(bodyParser.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
