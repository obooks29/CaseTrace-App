import rateLimit from "express-rate-limit";

export const strictLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many requests. Please slow down.",
});
