"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth.route"));
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
router.use("/api/users", middleware_1.authenticateToken, auth_route_1.default);
router.get("/api/jwt", (req, res) => {
    const token = (0, middleware_1.generateAccessToken)();
    return res.status(200).send({ err: false, token });
});
exports.default = router;
