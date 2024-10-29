import { Request, Response } from "express";
import { AuthService } from "../services";

export class AuthController {
  static async signup(req: Request, res: Response) {
    const userData = req.body;
    console.log(userData);

    const user = await AuthService.signup(userData).catch((err) => {
      res.status(400).send({ err: true, name: err.name, message: err.message });
    });

    res.status(201).send(user);
  }
}
