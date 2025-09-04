import rateLimit from "express-rate-limit";

const authlimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  limit: 15,
  standardHeaders: "draft-6",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: "Too many requests from IP, please try again later",
});

const normalLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, //30 minutes
  limit: 400,
  standardHeaders: "draft-6",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: "Too many requests from IP, please try again later",
});

export { authlimiter, normalLimiter };
