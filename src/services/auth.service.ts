import { IUser, User } from "../db/models";

export class AuthService {
  static async singup(userData: IUser) {
    const users = await User.find({
      $or: [
        { userName: userData.userName },
        { emailAddress: userData.emailAddress },
      ],
    });

    console.log(users);

    if (users) {
      throw new Error(
        "User credentials already exist (userName and/or emailAdress)",
      );
    }

    const newUser = new User(userData);
    newUser
      .save()
      .then((user) => {
        return user;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
