import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

export function generateAccessToken() {
  const payload: any = {
    date: new Date(),
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET as string, { expiresIn: 3600 });
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    next();
  });
}
