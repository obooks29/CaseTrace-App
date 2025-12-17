// server.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { caseRouter } from "./src/controllers/case.controller";
import { prisma } from "./src/lib/prisma";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Simple health check
app.get("/health", async (req, res) => {
  try {
    // quick DB ping
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok" });
  } catch (err) {
    console.error("Health check failed", err);
    res.status(500).json({ status: "error", error: String(err) });
  }
});

// API routes
app.use("/api/cases", caseRouter);

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error", err);
  res.status(500).json({ error: "Internal server error" });
});

const port = Number(process.env.PORT || 4000);

app.listen(port, () => {
  console.log(`Casetrace API listening on http://localhost:${port}`);
});
