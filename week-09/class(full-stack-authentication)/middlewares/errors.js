export const errorMiddlewares = (error, req, res, next) => {
  let message = error.message || "something want wrong";
  let statusCode = error.statusCode || 500;
  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      error: message,
      stack: error.stack,
    });
  }
  res.status(statusCode).json({
    error: message,
  });
};
