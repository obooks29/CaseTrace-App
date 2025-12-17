import { Request, Response } from 'express';
import { activityService } from '../services/activity.service';

export const activityController = {
  async getTimeline(req: Request, res: Response) {
    try {
      const caseId = Number(req.params.caseId);
      const timeline = await activityService.getCaseTimeline(caseId);

      res.json({ data: timeline });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  }
};
