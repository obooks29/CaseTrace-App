import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateCase() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("NORMAL");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    await api.post("/cases", {
      title,
      description,
      priority
    });

    navigate("/");
  }

  return (
    <div className="px-6 py-8 max-w-xl mx-auto">
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Create Case
        </h2>
        <p className="text-gray-600 mb-6">
          Submit a new case for tracking and review
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Case title
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="LOW">Low</option>
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Create Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}