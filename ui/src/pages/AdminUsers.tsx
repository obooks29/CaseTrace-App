import { useEffect, useState } from "react";
import { fetchUsers, updateUserRole } from "../api/api";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div className="px-6 py-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Users
      </h1>

      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white border rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-gray-900">
                {u.email}
              </p>
              <p className="text-sm text-gray-500">
                User ID: {u.id}
              </p>
            </div>

            <select
              className="border rounded px-2 py-1"
              value={u.role}
              onChange={(e) =>
                updateUserRole(u.id, e.target.value)
              }
            >
              <option value="ADMIN">ADMIN</option>
              <option value="STAFF">STAFF</option>
              <option value="CLIENT">CLIENT</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}