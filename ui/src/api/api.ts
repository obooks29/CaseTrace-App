// ui/src/api/api.ts
import axios from "axios";

/**
 * DEMO MODE
 * Auth is bypassed for hackathon submission.
 * No JWT, no login required.
 */

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

// ⛔️ DISABLED AUTH INTERCEPTOR FOR DEMO
// api.interceptors.request.use((config) => {
//   const stored = localStorage.getItem("auth");
//   if (stored) {
//     const { token } = JSON.parse(stored);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

/* ================= CASES ================= */

export const fetchCases = async () => {
  const res = await api.get("/cases");
  return res.data;
};

export const fetchCaseById = async (id: string) => {
  const res = await api.get(`/cases/${id}`);
  return res.data;
};

export const updateCaseStatus = async (id: string, status: string) => {
  await api.put(`/cases/${id}`, { status });
};

/* ================= COMMENTS ================= */

export const addComment = async (caseId: string, message: string) => {
  await api.post("/comments", { caseId, message });
};

/* ================= FILES ================= */

export const uploadCaseFile = async (caseId: string, file: File) => {
  const form = new FormData();
  form.append("file", file);
  await api.post(`/cases/${caseId}/files`, form);
};

/* ================= ACTIVITY ================= */

export const fetchActivity = async (caseId: string) => {
  const res = await api.get(`/activity/${caseId}`);
  return res.data;
};

/* ================= ADMIN (DEMO ENABLED) ================= */

export const fetchUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const updateUserRole = async (id: string, role: string) => {
  await api.put(`/users/${id}/role`, { role });
};

/* ================= AUDIT ================= */

export const fetchAuditLogs = async () => {
  const res = await api.get("/audit");
  return res.data;
};

export default api;
