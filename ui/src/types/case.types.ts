export interface CommentItem {
  id: string;
  author: string;
  message: string;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  actor: string;
  createdAt: string;
}

export interface FileItem {
  id: string;
  filename: string;
  url: string;
}

export type CaseStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export interface CaseItem {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  createdAt: string;
  updatedAt?: string;
  comments: CommentItem[];
  activities: ActivityItem[];
  files: FileItem[];
}
