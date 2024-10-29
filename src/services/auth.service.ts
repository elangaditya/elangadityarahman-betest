import { IUser, User } from "../db/models";
import { NotFoundError, UniqueValueError } from "../errors";

export class AuthService {
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

    if (accountNumber) {
      queryParams.accountNumber = accountNumber;
    }

    if (identityNumber) {
      queryParams.identityNumber = identityNumber;
    }

    const user = await User.findOne(queryParams);

    if (!user) {
      throw new NotFoundError("user not found", queryParams);
    }

    return user;
  }
}
