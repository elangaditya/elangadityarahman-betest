import { Schema, model } from "mongoose";

export interface IUser {
  id: string;
  userName: string;
  accountNumber: number;
  emailAddress: string;
  identityNumber: number;
}

export const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
  userName: { type: String, required: true },
  accountNumber: { type: Number, required: true },
  emailAddress: { type: String, required: true},
  identityNumber: { type: Number, required: true },
})
