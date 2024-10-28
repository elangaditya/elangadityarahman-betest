import { connect } from "mongoose";
//import { IUser, userSchema } from "./models";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@dbelangadityabetest.rsoqk.mongodb.net/?retryWrites=true&w=majority&appName=dbelangadityabetest`;

export const dbConn = connect(uri);
