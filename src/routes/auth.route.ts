import express from "express";
import { AuthController } from "../controller";

const router = express.Router();

router.get('/', AuthController.getUsers)
router.post('/create', AuthController.create)
router.get('/find', AuthController.findUser)

export default router;
