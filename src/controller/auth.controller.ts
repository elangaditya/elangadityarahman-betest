import { Request, Response } from "express";

export class AuthController {
  static async signup(req: Request, res: Response) {
    res.status(200).send({ body: req.body });
  }
}
