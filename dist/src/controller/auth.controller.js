"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const services_1 = require("../services");
const errors_1 = require("../errors");
const models_1 = require("../db/models");
const db_1 = require("../db");
class UserController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const { error } = models_1.createUserSchema.validate(userData);
            if (error) {
                res
                    .status(400)
                    .send({ err: true, name: error.name, message: error.message });
                return;
            }
            yield services_1.UserService.createUser(userData)
                .then((user) => {
                return res.status(201).send(user);
            })
                .catch((err) => {
                return res
                    .status(400)
                    .send({ err: true, name: err.name, message: err.message });
            });
        });
    }
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield services_1.UserService.getUsers()
                .then((users) => {
                return res.status(200).send({ err: false, users });
            })
                .catch((err) => {
                res.status(400).send({ err: true, message: err.message });
            });
        });
    }
    static findUserByIdentityNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identityNumber } = req.params;
            const query = parseInt(identityNumber, 10);
            if (!query) {
                return res
                    .send(400)
                    .send({ err: true, message: "Invalid identity number" });
            }
            const redisString = `identityNumber/${identityNumber}`;
            const data = yield db_1.redisClient.get(redisString);
            if (data) {
                return res
                    .status(200)
                    .send({ err: false, user: JSON.parse(data), cached: true });
            }
            yield services_1.UserService.findUserByIdentityNumber(query)
                .then((user) => {
                return res.status(200).send({ err: false, user });
            })
                .catch((err) => {
                if (err instanceof errors_1.NotFoundError) {
                    return res.status(404).send({
                        err: true,
                        name: err.name,
                        message: err.message,
                        query: err.query,
                    });
                }
                return res.status(400).send({ err: true, message: err.message });
            });
        });
    }
    static findUserByAccountNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountNumber } = req.params;
            const query = parseInt(accountNumber, 10);
            if (!query) {
                return res
                    .send(400)
                    .send({ err: true, message: "Invalid account number" });
            }
            const redisString = `accountNumber/${accountNumber}`;
            const data = yield db_1.redisClient.get(redisString);
            if (data) {
                return res
                    .status(200)
                    .send({ err: false, user: JSON.parse(data), cached: true });
            }
            yield services_1.UserService.findUserByAccountNumber(query)
                .then((user) => {
                return res.status(200).send({ err: false, user });
            })
                .catch((err) => {
                if (err instanceof errors_1.NotFoundError) {
                    return res.status(404).send({
                        err: true,
                        name: err.name,
                        message: err.message,
                        query: err.query,
                    });
                }
                return res.status(400).send({ err: true, message: err.message });
            });
        });
    }
    static findUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountNumber = req.query.accountNumber
                ? parseInt(req.query.accountNumber)
                : -1;
            const identityNumber = req.query.identityNumber
                ? parseInt(req.query.identityNumber)
                : -1;
            yield services_1.UserService.findUser(accountNumber, identityNumber)
                .then((user) => {
                return res.status(200).send({ err: false, user });
            })
                .catch((err) => {
                if (err instanceof errors_1.NotFoundError) {
                    return res.status(404).send({
                        err: true,
                        name: err.name,
                        message: err.message,
                        query: err.query,
                    });
                }
                return res.status(400).send({ err: true, message: err.message });
            });
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const { userId } = req.params;
            const { error } = models_1.updateUserSchema.validate(userData);
            if (error) {
                return res
                    .status(400)
                    .send({ err: true, name: error.name, message: error.message });
            }
            yield services_1.UserService.updateUser(userId, userData)
                .then((updatedUser) => {
                return res.status(200).send({ err: false, updatedUser });
            })
                .catch((err) => {
                return res
                    .status(400)
                    .send({ err: true, name: err.name, message: err.message });
            });
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            yield services_1.UserService.deleteUser(userId)
                .then((id) => {
                return res.status(200).send({ err: false, deletedId: id });
            })
                .catch((err) => {
                if (err instanceof errors_1.NotFoundError) {
                    return res.status(404).send({
                        err: true,
                        name: err.name,
                        message: err.message,
                        query: err.query,
                    });
                }
            });
        });
    }
}
exports.UserController = UserController;
