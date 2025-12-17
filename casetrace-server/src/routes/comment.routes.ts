// casetrace-server/src/routes/comment.routes.ts

import { Router } from "express";
import { commentController } from "../controllers/comment.controller";
import { validate } from "../middleware/validate.middleware";
import { createCommentSchema } from "../validators/comment.validators";

const router = Router();

/**
 * DEMO MODE
 * No authentication
 */

router.post("/", validate(createCommentSchema), commentController.createComment);
router.get("/:caseId", commentController.getComments);

export default router;