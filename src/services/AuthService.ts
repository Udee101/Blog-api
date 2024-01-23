import { validationResult } from "express-validator";
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import * as bcrypt from "bcrypt"
import { ApiResponse } from "../utils/ApiRespons";

export class AuthService {
  private static userRepository = AppDataSource.getRepository(User);

  public static async registerUser(data: any) {
    try {
      // validate all fields in the registration field and return the errors if the be any
      const errors = validationResult(data);
      if (!errors.isEmpty()) {
        return { status_code: 422, message: errors.mapped() }/*.mapped() returns only the first error if a field has multiple errors */
      }

      // check if the email or username has been used by another user
      const existingUser = await this.userRepository.find({
        where: [
          { username: data.body.username },
          { email: data.body.email }
        ]
      })

      if (existingUser) {
        return { status_code: 422, message: 'A user with this email or username already exists' }
      }

      // hash password
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(data.body.password, salt)

      const user = new User()
      user.first_name = data.body.first_name
      user.last_name = data.body.last_name
      user.username = data.body.username
      user.email = data.body.email
      user.password = hashedPassword

      await this.userRepository.save(user)

      return {
        status_code: 200,
        message: 'Registration Successful',
        user: user
      }

    } catch (error) {
      return { status_code: 500, message: error }
    }
  }

  public static async loginUser(data: any) {
    try {
      
    } catch (error) {
      
    }
  }
}
