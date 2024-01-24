import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv"

dotenv.config()

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.ACCESSTOKEN_SECRET, (err: any) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" })
      }
      next()
    })
  }else {
    return res.status(401).json({ message: "Unauthorized" })
  }
}

export const generateAccessToken = (req: Request, res: Response) => {

  const refreshToken = req.header('x-auth-token')
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh Token not found' })
  }
  try {
    
    const user: any = jwt.verify(refreshToken, process.env.REFRESHTOKEN_SECRET)

    const accessToken = jwt.sign({id: user.id }, process.env.ACCESSTOKEN_SECRET, { expiresIn: '15 minutes' })

    return res.status(201).json({ access_token: accessToken })

  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' })
  }
}
