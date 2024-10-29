import { Request, Response } from "express";
import { UserService } from "../services";
import { NotFoundError } from "../errors";
import { createUserSchema, updateUserSchema } from "../db/models";

export class UserController {
  static async create(req: Request, res: Response) {
    const userData = req.body;

    const { error } = createUserSchema.validate(userData);
    console.log("error: ", error);
    if (error) {
      res
        .status(400)
        .send({ err: true, name: error.name, message: error.message });
      return;
    }

    const user = await UserService.signup(userData).catch((err) => {
      return res
        .status(400)
        .send({ err: true, name: err.name, message: err.message });
    });

    return res.status(201).send(user);
  }

  static async getUsers(req: Request, res: Response) {
    const users = await UserService.getUsers().catch((err) => {
      res.status(400).send({ err: true, message: err.message });
    });

    return res.status(200).send({ err: false, users });
  }

  static async findUser(req: Request, res: Response) {
    const accountNumber = req.query.accountNumber
      ? parseInt(req.query.accountNumber as string)
      : -1;
    const identityNumber = req.query.identityNumber
      ? parseInt(req.query.identityNumber as string)
      : -1;

    const user = await UserService.findUser(
      accountNumber,
      identityNumber,
    ).catch((err) => {
      if (err instanceof NotFoundError) {
        return res
          .status(404)
          .send({ err: true, message: err.message, query: err.query });
      }

      return res.status(400).send({ err: true, message: err.message });
    });

    return res.status(200).send({ err: false, user });
  }

  static async updateUser(req: Request, res: Response) {
    const userData = req.body;
    const { userId } = req.params;
    const { error } = updateUserSchema.validate(userData);
    if (error) {
      return res
        .status(400)
        .send({ err: true, name: error.name, message: error.message });
    }

    const updatedUser = await UserService.updateUser(userId, userData).catch(
      (err) => {
        return res
          .status(400)
          .send({ err: true, name: err.name, message: err.message });
      },
    );

    console.log("update ", updatedUser);
    return res.status(200).send({ err: false, updatedUser });
  }
}
