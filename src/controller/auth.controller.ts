import { Request, Response } from "express";
import { AuthService } from "../services";
import { NotFoundError } from "../errors";

export class AuthController {
  static async create(req: Request, res: Response) {
    const userData = req.body;
    console.log(userData);

    const user = await AuthService.signup(userData).catch((err) => {
      res.status(400).send({ err: true, name: err.name, message: err.message });
    });

    res.status(201).send(user);
  }

  static async getUsers(req: Request, res: Response) {
    const users = await AuthService.getUsers().catch((err) => {
      res.status(400).send({ err: true, message: "unable to get users" });
    });

    res.status(200).send({ err: false, users });
  }

  static async findUser(req: Request, res: Response) {
    const accountNumber = req.query.accountNumber
      ? parseInt(req.query.accountNumber as string)
      : -1;
    const identityNumber = req.query.identityNumber
      ? parseInt(req.query.identityNumber as string)
      : -1;

    const user = await AuthService.findUser(
      accountNumber,
      identityNumber,
    ).catch((err) => {
      if (err instanceof NotFoundError) {
        res
          .status(404)
          .send({ err: true, message: err.message, query: err.query });
      }

      res.status(400).send({ err: true, message: err.message });
    });

    res.status(200).send({ err: false, user });
  }
}
