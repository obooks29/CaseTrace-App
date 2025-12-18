// casetrace-server/src/server.ts

import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

import caseRouter from "./routes/case.routes";
import { prisma } from "./lib/prisma";

const app = express();

app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok" });
  } catch (err) {
    console.error("Health check failed", err);
    res.status(500).json({ status: "error" });
  }
});

app.use("/api/cases", caseRouter);

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

const port = Number(process.env.PORT || 4000);

app.listen(port, () => {
  console.log(`Casetrace API listening on port ${port}`);
});