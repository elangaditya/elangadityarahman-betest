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
exports.UserService = void 0;
const db_1 = require("../db");
const models_1 = require("../db/models");
const errors_1 = require("../errors");
class UserService {
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield models_1.User.find({
                $or: [
                    { userName: userData.userName },
                    { emailAddress: userData.emailAddress },
                ],
            });
            if (users[0]) {
                throw new errors_1.UniqueValueError("User credentials already exist (userName and/or emailAdress)");
            }
            const newUser = new models_1.User(userData);
            const user = yield newUser.save();
            if (!user) {
                throw new Error("Unable to create user");
            }
            return user;
        });
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield models_1.User.find({});
            return users;
        });
    }
    static findUserByAccountNumber(accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisString = `accountNumber/${accountNumber}`;
            const queryParams = {
                accountNumber,
            };
            const user = yield models_1.User.findOne(queryParams);
            if (!user) {
                throw new errors_1.NotFoundError("user not found", queryParams);
            }
            const returnData = yield db_1.redisClient.set(redisString, JSON.stringify(user));
            console.log(returnData);
            return user;
        });
    }
    static findUserByIdentityNumber(identityNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisString = `identityNumber/${identityNumber}`;
            const queryParams = {
                identityNumber,
            };
            const user = yield models_1.User.findOne(queryParams);
            if (!user) {
                throw new errors_1.NotFoundError("user not found", queryParams);
            }
            const returnData = yield db_1.redisClient.set(redisString, JSON.stringify(user));
            console.log(returnData);
            return user;
        });
    }
    static findUser(accountNumber, identityNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = {};
            if (accountNumber != -1) {
                queryParams.accountNumber = accountNumber;
            }
            if (identityNumber != -1) {
                queryParams.identityNumber = identityNumber;
            }
            const user = yield models_1.User.findOne(queryParams);
            if (!user) {
                throw new errors_1.NotFoundError("user not found", queryParams);
            }
            return user;
        });
    }
    static updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({ _id: id });
            console.log(user);
            if (!user) {
                throw new errors_1.NotFoundError("user not found", { _id: id });
            }
            const cacheInvalidate = [];
            for (const [key, value] of Object.entries(userData)) {
                if (key == "accountNumber") {
                    cacheInvalidate.push(`accountNumber/${user.accountNumber}`);
                }
                if (key == "identityNumber") {
                    cacheInvalidate.push(`identityNumber/${user.identityNumber}`);
                }
                user.set(key, value);
            }
            yield user.save().catch((err) => {
                throw err;
            });
            for (let i = 0; i < cacheInvalidate.length; i++) {
                yield db_1.redisClient.del(cacheInvalidate[i]);
            }
            return user;
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({ _id: id });
            if (!user) {
                throw new errors_1.NotFoundError("user not found", { _id: id });
            }
            models_1.User.deleteOne({ _id: id }).catch((err) => {
                throw err;
            });
            yield db_1.redisClient.del(`accountNumber/${user.accountNumber}`);
            yield db_1.redisClient.del(`identityNumber/${user.identityNumber}`);
            return id;
        });
    }
}
exports.UserService = UserService;
