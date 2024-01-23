import { validationResult } from "express-validator";
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
export class AuthService {
  private static userRepository = AppDataSource.getRepository(User);

  public static async registerUser(data: any) {
    try {
      // validate all fields in the registration form and return the errors if there be any
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
        status_code: 201,
        message: 'Registration Successful',
        user: user
      }

    } catch (error) {
      return { status_code: 500, message: error.message }
    }
  }

  public static async loginUser(data: any, res: any) {
    try {
      // validate all fields in the login form and return there errors if the be any
      const errors = validationResult(data);
      if (!errors.isEmpty()) {
        return { status_code: 422, message: errors.mapped() }/*.mapped() returns only the first error if a field has multiple errors */
      } 

      const user = await this.userRepository.findOne({
        where: [
          { username: data.body.username_or_email },
          { email: data.body.username_or_email },
        ]
      })

      if (!user) {
        return { status_code: 422, message: 'Invalid credentials' }
      }
      
      const verifyPassword = await bcrypt.compare(data.body.password, user.password)
      if (!verifyPassword) {
        return { status_code: 422, message: 'Incorrect Password' }
      }

      // create access token using jsonwebtoken
      const accessToken = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '10s' })

      // create refresh token using jsonwebtoken
      const refreshToken = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '1w' })

      // store tokens as cookies
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })

      return { status_code: 200, message: 'Login Successful' }

    } catch (error) {
      return { status_code: 500, message: error.message }
    }
  }
}
