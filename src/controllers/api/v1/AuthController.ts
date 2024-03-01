import * as dotenv from "dotenv"
import { Request, Response } from "express"
import { AuthService } from "../../../services/AuthService";

dotenv.config({ path: ".env" });
export class AuthController {
  public static register = async(req:Request, res:Response) => {
    const regResult = await AuthService.registerUser(req)
    return res.status(regResult.status_code).json(regResult)
  };

  public static login = async(req:Request, res:Response) => {
    const login = await AuthService.userLogin(req)
    return res.status(login.status_code).json(login)
  }
}
