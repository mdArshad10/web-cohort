class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "something went wrong",
    data = null,
    stack = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.data = data;

    if (stack) {
      this.stack = stack;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
