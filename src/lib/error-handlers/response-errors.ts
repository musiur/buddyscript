/* eslint-disable */

export const ResponseErrors = (error: any) => {
  const messages: Record<string, { message: string; status: number }> = {
    UserNotFoundException: {
      message: "User not found",
      status: 400,
    },
    NotAuthorizedException: {
      message: "User is already confirmed",
      status: 400,
    },
    LimitExceededException: {
      message: "Too many requests. Please try again later.",
      status: 429,
    },
    UsernameExistsException: {
      message: "Username already exists",
      status: 400,
    },
    InvalidPasswordException: {
      message: "Password does not meet requirements",
      status: 400,
    },
    CodeMismatchException: {
      message: "Authentication failed. Please check your configuration.",
      status: 400,
    },
    ExpiredCodeException: {
      message: "Verification code has expired. Please request a new one.",
      status: 400,
    },
    UserNotConfirmedException: {
      message: "User is not confirmed",
      status: 400,
    },
    InvalidParameterException: {
      message: "Invalid request!",
      status: 400,
    },
    ResourceNotFoundException: {
      message: "Resource Not found!",
      status: 404,
    },

    DEFAULT: {
      message: "Failed to resend confirmation code",
      status: 500,
    },
  }

  return messages[error.name]
}
