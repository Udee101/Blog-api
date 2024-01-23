import { body } from "express-validator";

export class ValidationMiddleware {
  public static userRegistrationValidation = [
    body('first_name')
    .notEmpty().withMessage('First name field is required.')
    .isString().trim(),

    body('last_name')
      .notEmpty().withMessage('Last name field is required.')
      .isString().trim(),
      
    body('email')
      .notEmpty().withMessage('Email field is required.')
      .isEmail().withMessage('Email must be a valid email'),

    body('username')
      .notEmpty().withMessage('Username field is required.')
      .isString().trim(),

    body('password')
      .notEmpty().withMessage('Password field is required.')
      .isString().trim()
  ]
} 
