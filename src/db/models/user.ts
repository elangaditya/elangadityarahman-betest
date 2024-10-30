import Joi from "joi";
import { Schema, model, mongo } from "mongoose";

export interface IUser {
  _id?: string;
  userName: string;
  accountNumber: number;
  emailAddress: string;
  identityNumber: number;
}

export interface IUserUpdate {
  userName?: string;
  accountNumber?: string;
  emailAddress?: string;
  identityNumber?: string;
}

export const userSchema = new Schema<IUser>({
  _id: {
    type: String,
    default: () => {
      return new mongo.ObjectId();
    },
    required: true,
  },
  userName: { type: String, required: true },
  accountNumber: { type: Number, required: true },
  emailAddress: { type: String, required: true },
  identityNumber: { type: Number, required: true },
});

userSchema.index({ accountNumber: 1, identityNumber: 1 }, { unique: true });

export const User = model("User", userSchema);

export const createUserSchema = Joi.object({
  userName: Joi.string().alphanum().required(),
  accountNumber: Joi.number().integer().required(),
  emailAddress: Joi.string().email().required(),
  identityNumber: Joi.number().integer().required(),
}).strict();

export const updateUserSchema = Joi.object({
  userName: Joi.string().alphanum(),
  accountNumber: Joi.number().integer(),
  emailAddress: Joi.string().email(),
  identityNumber: Joi.number().integer(),
}).strict();
