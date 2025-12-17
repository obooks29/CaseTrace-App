import { Request, Response } from 'express';
import { commentService } from '../services/comment.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const commentController = {
  async createComment(req: AuthRequest, res: Response) {
    try {
      const { message, caseId } = req.body;

      const comment = await commentService.createComment({
        message,
        caseId,
        authorId: req.user!.id,
      });

      return res.status(201).json({
        message: "Comment added",
        data: comment,
      });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  },

  async getComments(req: Request, res: Response) {
    try {
      const caseId = Number(req.params.caseId);

      const comments = await commentService.getComments(caseId);

      res.json({ data: comments });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  }
};
