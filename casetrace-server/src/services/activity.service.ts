import prisma from '../lib/prisma';

export const activityService = {
  async log(caseId: number, actorId: number, action: string) {
    return await prisma.activityLog.create({
      data: { caseId, actorId, action }
    });
  },

  async getCaseTimeline(caseId: number) {
    return await prisma.activityLog.findMany({
      where: { caseId },
      include: {
        actor: { select: { id: true, name: true, role: true } },
      },
      orderBy: { timestamp: 'asc' },
    });
  }
};
