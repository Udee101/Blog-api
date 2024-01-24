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
  ];

  public static userLoginValidation = [
    body('username_or_email')
      .notEmpty().withMessage('Username or Email is required.')
      .isString().trim(),

    body('password')
      .notEmpty().withMessage('Password field is required.')
      .isString().trim()
  ];

  public static postCreationValidation = [
    body('title')
    .notEmpty().withMessage('Title field is required.')
    .isString().trim(),

    body('content')
      .notEmpty().withMessage('Content field is required.')
      .isString().trim(),
      
    body('author')
      .notEmpty().withMessage('Author field is required.')
      .isString().trim(),
  ]
} 
