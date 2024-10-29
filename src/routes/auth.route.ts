import express from "express";
import { UserController } from "../controller";

const router = express.Router();

router.get("/", UserController.getUsers);
router.post("/create", UserController.create);
router.get("/find", UserController.findUser);
router.post("/:userId", UserController.updateUser);
router.delete("/:userId", UserController.deleteUser);

export default router;
