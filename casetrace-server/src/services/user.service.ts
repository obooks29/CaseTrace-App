// src/services/user.service.ts
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export const userService = {
  async createUser({ name, email, password, role }: { name?: string; email: string; password: string; role?: string }) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: (role as any) ?? "CLIENT",
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    return user;
  },

  async login({ email, password }: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) return null;

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;

    // return minimal user payload
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  },

  async getById(id: number) {
    return prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, role: true } });
  },
};
