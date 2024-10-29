import express from "express";
import auth from "./auth.route";

const router = express.Router();

router.use("/api/auth", auth);

export default router;
