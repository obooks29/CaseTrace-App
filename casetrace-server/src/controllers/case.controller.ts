// casetrace-server/src/controllers/case.controller.ts

import { Request, Response } from "express";
import { caseService } from "../services/case.service";

export const createCase = async (req: Request, res: Response) => {
  try {
    const created = await caseService.createCase(req.body, 1); // demo admin
    res.status(201).json(created);
  } catch (err) {
    console.error("createCase error", err);
    res.status(500).json({ error: "Failed to create case" });
  }
};

export const getAllCases = async (_req: Request, res: Response) => {
  try {
    const cases = await caseService.getAllCases();
    res.json(cases);
  } catch (err) {
    console.error("getAllCases error", err);
    res.status(500).json({ error: "Failed to fetch cases" });
  }
};

export const getCaseById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const found = await caseService.getCaseById(id);

    if (!found) {
      return res.status(404).json({ error: "Case not found" });
    }

    res.json(found);
  } catch (err) {
    console.error("getCaseById error", err);
    res.status(500).json({ error: "Failed to fetch case" });
  }
};

export const updateCase = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updated = await caseService.updateCase(id, req.body, 1);
    res.json(updated);
  } catch (err) {
    console.error("updateCase error", err);
    res.status(500).json({ error: "Failed to update case" });
  }
};

export const deleteCase = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await caseService.deleteCase(id);
    res.json({ success: true });
  } catch (err) {
    console.error("deleteCase error", err);
    res.status(500).json({ error: "Failed to delete case" });
  }
};