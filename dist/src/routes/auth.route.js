"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = express_1.default.Router();
router.get("/", controller_1.UserController.getUsers);
router.post("/create", controller_1.UserController.create);
router.get("/find", controller_1.UserController.findUser);
router.get("/find/accountNumber/:accountNumber", controller_1.UserController.findUserByAccountNumber);
router.get("/find/identityNumber/:identityNumber", controller_1.UserController.findUserByIdentityNumber);
router.post("/:userId", controller_1.UserController.updateUser);
router.delete("/:userId", controller_1.UserController.deleteUser);
exports.default = router;
