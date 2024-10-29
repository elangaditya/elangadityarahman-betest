import {describe, expect, test} from "@jest/globals"
import { AuthService } from "../src/services/auth.service"
import { IUser } from "../src/db/models"

const userData: IUser = {
  userName: "elangaditya",
  emailAddress: "elangadityar@gmail.com",
  accountNumber: 12345,
  identityNumber: 67890, 
}

describe('auth module', () => {
  test('sign up function', async () => {
    const user = await AuthService.signup(userData)

    expect(user).toBe(user)
  })
})
