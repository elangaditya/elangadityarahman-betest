import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser {
  id?: string;
  userName: string;
  accountNumber: number;
  emailAddress: string;
  identityNumber: number;
}

export const userSchema = new Schema<IUser>({
  id: {
    type: String,
    default: () => {
      return uuidv4();
    },
    required: true,
  },
  userName: { type: String, required: true },
  accountNumber: { type: Number, required: true },
  emailAddress: { type: String, required: true },
  identityNumber: { type: Number, required: true },
});

export const User = model("User", userSchema);
