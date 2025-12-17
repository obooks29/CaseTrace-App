import { z } from 'zod';

export const createCommentSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  caseId: z.number(),
});
