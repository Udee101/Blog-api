export class Errors {
  readonly error: string;
  readonly status_code: number;

  constructor(error: string, status_code: number) {
    this.error = error;
    this.status_code = status_code;
  }

  static USERNAME_OR_EMAIL_ALREADY_EXISTS = new Errors( 
    'Username or Email already exists',
    400
  )

  static USER_REGISTRATION_SERVER_ERROR = new Errors(
    'An error ocurred registering user',
    500
  )

  static INVALID_CREDENTIALS = new Errors( 
    'Invalid Credentials',
    400
  )

  static USER_LOGIN_SERVER_ERROR = new Errors(
    'An error occured while logging in user',
    500
  )

  static USER_UPDATE_SERVER_ERROR = new Errors(
    'An error occured while updating user',
    500
  )

  static LISTING_CREATION_SERVER_ERROR = new Errors(
    'An error occured while creating job listing',
    500
  )

  static FETCH_ALL_LISTINGS_SERVER_ERROR = new Errors(
    'An error occured while fetching job listings',
    500
  )

  static LISTING_NOT_FOUND = new Errors(
    'Listing not found',
    404
  )
  
  static LISTING_DETAILS_SERVER_ERROR = new Errors(
    'An error occured while retrieving listing details',
    500
  )

  static LISTING_UPDATE_SERVER_ERROR = new Errors(
    'An error occured while updating listing',
    500
  )

  static USER_LISTINGS_SERVER_ERROR = new Errors(
    'An error occured while retrieving user listings',
    500
  )

  static LISTING_DELETE_SERVER_ERROR = new Errors(
    'An error occured while deleting job listing',
    500
  )
}
