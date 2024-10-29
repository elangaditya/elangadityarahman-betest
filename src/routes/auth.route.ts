import express from "express";
import { AuthController } from "../controller";

const router = express.Router();

router.post('/signup', AuthController.signup)

export default router;
