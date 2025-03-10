class ErrorHandler extends Error {
  constructor(message = "something want wrong", statusCode = 404) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, constructor);
  }
}

export { ErrorHandler };
