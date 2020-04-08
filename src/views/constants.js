export const ErrorType = {
  EMAIL_REQUIRED: 'email_required',
  EMAIL_INVALID: 'email_invalid',
  EMAIL_DOESNT_MATCH: 'email_doesnt_match',
  PASSWORD_REQUIRED: 'password_required',
  PASSWORD_INVALID: 'password_invalid',
  PASSWORD_DOESNT_MATCH: 'password_doesnt_match',
  TERMS_REQUIRED: 'terms_required',
  USER_NAME_EXISTS_EXCEPTION: 'UsernameExistsException',
  USER_NOT_FOUND_EXCEPTION: 'UserNotFoundException',
  CANT_FETCH_ADDRESS: 'CantFetchAddress',
  MANDATORY: 'Mandatory',
  ZIP_CODE_INVALID: 'zip_code_invalid',
  HOUSE_NUMBER_INVALID: 'house_number_invalid',
}

export const AuthStateValue = {
  SIGNED_IN: 'signedIn',
  SIGNED_OUT: 'signedOut',
}
