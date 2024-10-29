import { IUser, User } from "../db/models";
import { UniqueValueError } from "../errors/db";

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
}
