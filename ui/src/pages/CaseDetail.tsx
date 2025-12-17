// ui/src/pages/CaseDetail.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import {
  fetchCaseById,
  addComment,
  updateCaseStatus,
  uploadCaseFile,
  fetchActivity
} from "../api/api";
import { CaseItem } from "../types/case.types";
// import { useAuth } from "../contexts/AuthContext";

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  //  const { isAdmin } = useAuth();

    // REMOVE THIS
  // import { useAuth } from "../contexts/AuthContext";

  // REMOVE THIS
  // const { isAdmin } = useAuth();

  // ADD THIS
  const isAdmin = true;

  const [caseItem, setCaseItem] = useState<CaseItem | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  async function reload() {
    if (!id) return;
    const data = await fetchCaseById(id);
    setCaseItem(data);
  }

  useEffect(() => {
    reload().finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!caseItem) return <p className="p-6">Case not found</p>;

  return (
    <div className="p-6 space-y-6">
      <Header />

      <h1 className="text-2xl font-bold">{caseItem.title}</h1>

      <p>Status: {caseItem.status}</p>

      {isAdmin && (
        <select
          value={caseItem.status}
          onChange={async (e) => {
            await updateCaseStatus(caseItem.id, e.target.value);
            reload();
          }}
          className="border p-2"
        >
          <option>OPEN</option>
          <option>IN_PROGRESS</option>
          <option>RESOLVED</option>
          <option>CLOSED</option>
        </select>
      )}

      {/* Description */}
      <div className="bg-white border p-4 rounded">
        {caseItem.description}
      </div>

      {/* Files */}
      <div>
        <h3 className="font-semibold">Files</h3>
        <input
          type="file"
          onChange={async (e) => {
            if (!e.target.files?.[0]) return;
            await uploadCaseFile(caseItem.id, e.target.files[0]);
            reload();
          }}
        />
      </div>

      {/* Activity */}
      <div>
        <h3 className="font-semibold">Activity</h3>
        {caseItem.activities.map((a) => (
          <p key={a.id} className="text-sm text-gray-600">
            {a.actor} {a.action} • {new Date(a.createdAt).toLocaleString()}
          </p>
        ))}
      </div>

      {/* Comments */}
      <div>
        <h3 className="font-semibold">Comments</h3>

        {caseItem.comments.map((c) => (
          <div key={c.id} className="border p-2 rounded mb-2">
            <p>{c.message}</p>
            <small>{c.author}</small>
          </div>
        ))}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await addComment(caseItem.id, comment);
            setComment("");
            reload();
          }}
        >
          <textarea
            className="border p-2 w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="bg-black text-white px-3 py-1 mt-2">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
}
