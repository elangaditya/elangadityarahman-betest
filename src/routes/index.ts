import express from "express";
import auth from "./auth.route";

const router = express.Router();

router.use("/api/users", auth);

export default router;
