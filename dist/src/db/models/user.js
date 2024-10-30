"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = exports.User = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: () => {
            return new mongoose_1.mongo.ObjectId();
        },
        required: true,
    },
    userName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    emailAddress: { type: String, required: true },
    identityNumber: { type: Number, required: true },
});
exports.userSchema.index({ accountNumber: 1, identityNumber: 1 }, { unique: true });
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
exports.createUserSchema = joi_1.default.object({
    userName: joi_1.default.string().alphanum().required(),
    accountNumber: joi_1.default.number().integer().required(),
    emailAddress: joi_1.default.string().email().required(),
    identityNumber: joi_1.default.number().integer().required(),
}).strict();
exports.updateUserSchema = joi_1.default.object({
    userName: joi_1.default.string().alphanum(),
    accountNumber: joi_1.default.number().integer(),
    emailAddress: joi_1.default.string().email(),
    identityNumber: joi_1.default.number().integer(),
}).strict();
