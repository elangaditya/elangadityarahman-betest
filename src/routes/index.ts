import express, { Request, Response } from "express";
import auth from "./auth.route";
import { authenticateToken, generateAccessToken } from "../middleware";

const router = express.Router();

router.use("/api/users", authenticateToken, auth);

router.get("/api/jwt", (req: Request, res: Response) => {
  const token = generateAccessToken();

  return res.status(200).send({ err: false, token });
});

export default router;
