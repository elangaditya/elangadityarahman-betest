import { Request, Response } from "express";
import { UserService } from "../services";
import { NotFoundError } from "../errors";
import { createUserSchema, updateUserSchema } from "../db/models";
import { redisClient } from "../db";

export class UserController {
  static async create(req: Request, res: Response) {
    const userData = req.body;

    const { error } = createUserSchema.validate(userData);
    if (error) {
      res
        .status(400)
        .send({ err: true, name: error.name, message: error.message });
      return;
    }

    await UserService.createUser(userData)
      .then((user) => {
        return res.status(201).send({ err: false, user });
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ err: true, name: err.name, message: err.message });
      });
  }

  static async getUsers(req: Request, res: Response) {
    await UserService.getUsers()
      .then((users) => {
        return res.status(200).send({ err: false, users });
      })
      .catch((err) => {
        res.status(400).send({ err: true, message: err.message });
      });
  }

  static async findUserByIdentityNumber(req: Request, res: Response) {
    const { identityNumber } = req.params;

    const query = parseInt(identityNumber, 10);

    if (!query) {
      return res
        .send(400)
        .send({ err: true, message: "Invalid identity number" });
    }

    const redisString = `identityNumber/${identityNumber}`;

    const data = await redisClient.get(redisString);
    if (data) {
      return res
        .status(200)
        .send({ err: false, user: JSON.parse(data), cached: true });
    }

    await UserService.findUserByIdentityNumber(query)
      .then((user) => {
        return res.status(200).send({ err: false, user });
      })
      .catch((err) => {
        if (err instanceof NotFoundError) {
          return res.status(404).send({
            err: true,
            name: err.name,
            message: err.message,
            query: err.query,
          });
        }

        return res.status(400).send({ err: true, message: err.message });
      });
  }

  static async findUserByAccountNumber(req: Request, res: Response) {
    const { accountNumber } = req.params;

    const query = parseInt(accountNumber, 10);

    if (!query) {
      return res
        .send(400)
        .send({ err: true, message: "Invalid account number" });
    }

    const redisString = `accountNumber/${accountNumber}`;

    const data = await redisClient.get(redisString);
    if (data) {
      return res
        .status(200)
        .send({ err: false, user: JSON.parse(data), cached: true });
    }
    await UserService.findUserByAccountNumber(query)
      .then((user) => {
        return res.status(200).send({ err: false, user });
      })
      .catch((err) => {
        if (err instanceof NotFoundError) {
          return res.status(404).send({
            err: true,
            name: err.name,
            message: err.message,
            query: err.query,
          });
        }

        return res.status(400).send({ err: true, message: err.message });
      });
  }

  static async findUser(req: Request, res: Response) {
    const accountNumber = req.query.accountNumber
      ? parseInt(req.query.accountNumber as string)
      : -1;
    const identityNumber = req.query.identityNumber
      ? parseInt(req.query.identityNumber as string)
      : -1;

    await UserService.findUser(accountNumber, identityNumber)
      .then((user) => {
        return res.status(200).send({ err: false, user });
      })
      .catch((err) => {
        if (err instanceof NotFoundError) {
          return res.status(404).send({
            err: true,
            name: err.name,
            message: err.message,
            query: err.query,
          });
        }

        return res.status(400).send({ err: true, message: err.message });
      });
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

    await UserService.updateUser(userId, userData)
      .then((updatedUser) => {
        return res.status(200).send({ err: false, updatedUser });
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ err: true, name: err.name, message: err.message });
      });
  }

  static async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;

    await UserService.deleteUser(userId)
      .then((id) => {
        return res.status(200).send({ err: false, deletedId: id });
      })
      .catch((err) => {
        if (err instanceof NotFoundError) {
          return res.status(404).send({
            err: true,
            name: err.name,
            message: err.message,
            query: err.query,
          });
        }
      });
  }
}
