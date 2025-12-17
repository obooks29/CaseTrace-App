import { Router } from 'express';
import { activityController } from '../controllers/activity.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

// GET /api/activity/:caseId
router.get('/:caseId', activityController.getTimeline);

export default router;
