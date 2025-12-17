// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { userService } from "../services/user.service";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      if (!email || !password) return res.status(400).json({ error: "email and password required" });
      const user = await userService.createUser({ name, email, password, role });
      res.status(201).json({ message: "User created", user });
    } catch (err: any) {
      if (err?.code === "P2002") return res.status(400).json({ error: "Email already in use" });
      console.error(err);
      res.status(500).json({ error: "Registration failed" });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: "email and password required" });

      const user = await userService.login({ email, password });
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      res.json({
        message: "Login successful",
        token,
        user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Login failed" });
    }
  },
};
