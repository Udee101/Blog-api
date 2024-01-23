import { Request, Response } from "express";
import { AuthService } from "../../../services/AuthService";

export class AuthController {
  public static async register(req: Request, res: Response) {

    const registrationResponse = await AuthService.registerUser(req)
    return res.status(registrationResponse.status_code).json(registrationResponse)
  }

  public static async login(req: Request, res: Response) {
    
  }
}
