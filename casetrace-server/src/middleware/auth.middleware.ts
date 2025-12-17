// src/middleware/auth.middleware.ts
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth";

export function authMiddleware(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) {
  req.user = {
    id: 1,
    role: "ADMIN",
  };

  next();
}