import { redisClient } from "../db";
import { IUser, User } from "../db/models";
import { NotFoundError, UniqueValueError } from "../errors";

export class UserService {
  static async createUser(userData: IUser) {
    const users = await User.find({
      $or: [
        { userName: userData.userName },
        { emailAddress: userData.emailAddress },
      ],
    });

    if (users[0]) {
      throw new UniqueValueError(
        "User credentials already exist (userName and/or emailAdress)",
      );
    }

    const newUser = new User(userData);
    const user = await newUser.save();

    if (!user) {
      throw new Error("Unable to create user");
    }

    return user;
  }

  static async getUsers() {
    const users = await User.find({});

    return users;
  }

  static async findUserByAccountNumber(accountNumber: number) {
    const redisString = `accountNumber/${accountNumber}`;

    const queryParams: any = {
      accountNumber,
    };

    const user = await User.findOne(queryParams);

    if (!user) {
      throw new NotFoundError("user not found", queryParams);
    }

    const returnData = await redisClient.set(redisString, JSON.stringify(user));
    console.log(returnData);
    return user;
  }

  static async findUserByIdentityNumber(identityNumber: number) {
    const redisString = `identityNumber/${identityNumber}`;

    const queryParams: any = {
      identityNumber,
    };

    const user = await User.findOne(queryParams);

    if (!user) {
      throw new NotFoundError("user not found", queryParams);
    }
    const returnData = await redisClient.set(redisString, JSON.stringify(user));
    console.log(returnData);
    return user;
  }

  static async findUser(accountNumber: number, identityNumber: number) {
    const queryParams: any = {};

    if (accountNumber != -1) {
      queryParams.accountNumber = accountNumber;
    }

    if (identityNumber != -1) {
      queryParams.identityNumber = identityNumber;
    }

    const user = await User.findOne(queryParams);

    if (!user) {
      throw new NotFoundError("user not found", queryParams);
    }

    return user;
  }

  static async updateUser(id: string, userData: IUser) {
    const user = await User.findOne({ _id: id });
    console.log(user);

    if (!user) {
      throw new NotFoundError("user not found", { _id: id });
    }

    const cacheInvalidate: string[] = [];

    for (const [key, value] of Object.entries(userData)) {
      if (key == "accountNumber") {
        cacheInvalidate.push(`accountNumber/${user.accountNumber}`);
      }
      if (key == "identityNumber") {
        cacheInvalidate.push(`identityNumber/${user.identityNumber}`);
      }
      user.set(key, value);
    }

    await user.save().catch((err) => {
      throw err;
    });

    for (let i = 0; i < cacheInvalidate.length; i++) {
      await redisClient.del(cacheInvalidate[i]);
    }

    return user;
  }

  static async deleteUser(id: string) {
    const user = await User.findOne({ _id: id });

    if (!user) {
      throw new NotFoundError("user not found", { _id: id });
    }

    User.deleteOne({ _id: id }).catch((err) => {
      throw err;
    });

    return id;
  }
}
