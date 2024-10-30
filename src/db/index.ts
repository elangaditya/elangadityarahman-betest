import { connect } from "mongoose";
//import { IUser, userSchema } from "./models";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

export async function connectDb() {
  try {
    //console.log(`trying to connect to: ${uri}`);
    const db = await connect(process.env.DB_URI as string);
    return db;
  } catch (err) {
    throw new Error("unable to connect to db");
  }
}


export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_URL,
    port: 14769,
  },
});
