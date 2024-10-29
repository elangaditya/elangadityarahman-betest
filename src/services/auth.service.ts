import { IUser, User } from "../db/models";
import { NotFoundError, UniqueValueError } from "../errors";

export class UserService {
  static async signup(userData: IUser) {
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

    for (const [key, value] of Object.entries(userData)) {
      user.set(key, value);
    }

    await user.save().catch((err) => {
      throw err;
    });

    console.log(user);

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
