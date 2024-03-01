import { validationResult } from "express-validator"
import { AppDataSource } from "../data-source"
import { User } from "../model/User"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { Errors } from "../values/Errors"
import { config } from "dotenv";

config()

export class AuthService {
  private static userRepository = AppDataSource.getRepository(User)

  public static async registerUser(data: any) {
    try {
      const errors = validationResult(data);
      if (!errors.isEmpty()) {
        return { status_code: 400, error: errors.array() }
      }

      const existingUser = await this.userRepository.find({
        where: [
          { username: data.body.username },
          { email: data.body.email }
        ]
      })

      if (!existingUser) {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(data.body.password, salt)
        
        const user = new User()
        user.first_name = data.body.first_name
        user.last_name = data.body.last_name
        user.username = data.body.username
        user.email = data.body.email
        user.phone = data.body.phone
        user.password = hashedPassword
  
        await this.userRepository.save(user)
        
        return {
          status_code: 201,
          message: "Registration Successfull!",
          user: user
        } 
      } else {
        return Errors.USERNAME_OR_EMAIL_ALREADY_EXISTS
      }

    } catch (error:any) {
      return Errors.USER_REGISTRATION_SERVER_ERROR
    }
  }

  public static async userLogin(data: any) {
    try {
      const errors = validationResult(data)
      if (!errors.isEmpty()) {
        return { status_code: 400, error: errors.array() }
      }
  
      const user = await this.userRepository.findOne({
        where: [
          { username: data.body.usernameOrEmail },
          { email: data.body.usernameOrEmail }
        ]
      })
  
      if (!user) {
        return Errors.INVALID_CREDENTIALS
      }
  
      const passwordCheck = await bcrypt.compare(data.body.password, user.password)
      if (!passwordCheck) {
        return Errors.INVALID_CREDENTIALS
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 20 })
  
      return {
        status_code: 200,
        message: "Login Successfull",
        user: user,
        token: token
      }

    } catch (error) {
      return Errors.USER_LOGIN_SERVER_ERROR
    }
  }
}
