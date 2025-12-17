// casetrace-server/src/routes/user.routes.ts

import { Router } from "express";
import { userController } from "../controllers/user.controller";

const router = Router();

/**
 * DEMO MODE
 */

router.get("/", userController.allUsers);
router.put("/:id/role", userController.updateRole);

export default router;