"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./src/routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./src/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, db_1.connectDb)();
db_1.redisClient.connect();
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use(body_parser_1.default.json());
app.use("/", routes_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
