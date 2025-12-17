import prisma from '../lib/prisma';

export const commentService = {
  async createComment(data: { message: string; caseId: number; authorId: number }) {
    return await prisma.comment.create({
      data,
    });
  },

  async getComments(caseId: number) {
    return await prisma.comment.findMany({
      where: { caseId },
      include: {
        author: { select: { id: true, name: true, role: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }
};
