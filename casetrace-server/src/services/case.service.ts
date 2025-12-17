// casetrace-server/src/services/case.service.ts

import { prisma } from "../lib/prisma";

export const caseService = {
  async createCase(data: any, userId: number) {
    return prisma.case.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        userId,
      },
    });
  },

  async getAllCases() {
    return prisma.case.findMany({
      include: {
        owner: true,
        user: true,
        comments: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getCaseById(id: number) {
    return prisma.case.findUnique({
      where: { id },
      include: {
        owner: true,
        user: true,
        comments: {
          include: { author: true },
        },
        activityLogs: true,
      },
    });
  },

  async updateCase(id: number, data: any, actorId: number) {
    const updated = await prisma.case.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        updatedAt: new Date(),
      },
    });

    await prisma.activityLog.create({
      data: {
        caseId: id,
        actorId,
        action: `Updated case fields: ${Object.keys(data).join(", ")}`,
      },
    });

    return updated;
  },

  async assignCase(id: number, ownerId: number, actorId: number) {
    const updated = await prisma.case.update({
      where: { id },
      data: { ownerId },
    });

    await prisma.activityLog.create({
      data: {
        caseId: id,
        actorId,
        action: `Assigned case to user ${ownerId}`,
      },
    });

    return updated;
  },

  async deleteCase(id: number) {
    return prisma.case.delete({
      where: { id },
    });
  },
};