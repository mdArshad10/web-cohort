import { rateLimit } from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: true,
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: {
    success: false,
    message:
      "Too many requests from this route, please try again after 15 minutes.",
  },
  keyGenerator: (req, res) =>
    req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress,
});



export { apiLimiter };
