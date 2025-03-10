export const errorMiddlewares = (error, req, res, next) => {
  const message = error.message || "something want wrong";
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message,
  });
};
