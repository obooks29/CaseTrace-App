// src/types/case.types.ts
export type CaseStatus = "OPEN" | "IN_PROGRESS" | "AWAITING_INFO" | "RESOLVED";

export interface CaseDTO {
  id: number;
  title: string;
  description: string | null;
  status: CaseStatus;
  priority: "LOW" | "MEDIUM" | "HIGH";
  ownerId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
