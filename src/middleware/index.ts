import * as dotenv from "dotenv"
import { Request, Response, NextFunction } from "express"
import { body } from "express-validator";
import * as jwt from "jsonwebtoken"

dotenv.config();

export const authenticateToken = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err: any) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized"
        })
      }
      next()
    })
  }else {
    return res.status(401).json({ message: "Unauthorized" })
  }
}

export const userRegistrationValidation = [
  body('first_name')
    .notEmpty().withMessage('First name field is required.')
    .isString(),

  body('last_name')
    .notEmpty().withMessage('Last name field is required.')
    .isString(),

  body('username')
    .notEmpty().withMessage('Username field is required.')
    .isString(),
    
  body('email')
    .notEmpty().withMessage('Email field is required.')
    .isEmail().withMessage('Email must be a valid email'),

  body('phone')
    .notEmpty().withMessage('Phone number field is required.')
    .isString(),
  
  body('password')
    .notEmpty().withMessage('Password field is required.')
    .isString()
]

export const userLoginValidation = [
  body('usernameOrEmail')
    .notEmpty().withMessage('The username or email field is required.')
    .isString(),

  body('password')
    .notEmpty().withMessage('Password field is required.')
    .isString()
]

export const listingCreationValidation = [
  body('title')
    .notEmpty().withMessage('First name field is required.')
    .isString(),

  body('tags')
    .notEmpty().withMessage('Last name field is required.')
    .isString(),

  body('company')
    .notEmpty().withMessage('Company name field is required.')
    .isString(),

  body('location')
    .notEmpty().withMessage('Location field is required.')
    .isString(),

  body('email')
    .notEmpty().withMessage('Company email field is required.')
    .isEmail().withMessage('Must be a valid email'),

  body('website')
    .notEmpty().withMessage('Website field is required.')
    .isURL(),
  
  body('description')
    .notEmpty().withMessage('Job description field is required.')
    .isString()
] 
