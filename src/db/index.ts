import { connect } from "mongoose";
//import { IUser, userSchema } from "./models";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@dbelangadityabetest.rsoqk.mongodb.net/?retryWrites=true&w=majority&appName=dbelangadityabetest`;

export async function connectDb() {
  try {
    //console.log(`trying to connect to: ${uri}`);
    const db = await connect(uri);
    return db;
  } catch (err) {
    throw new Error("unable to connect to db");
  }
}
