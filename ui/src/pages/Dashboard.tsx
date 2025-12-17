import { useEffect, useState } from "react";
import Header from "../components/Header";
import CaseCard from "../components/CaseCard";
import { fetchCases } from "../api/api";
import { CaseItem } from "../types/case.types";

export default function Dashboard() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCases = async () => {
      try {
        const data = await fetchCases();
        setCases(data);
      } catch (err) {
        console.error("Failed to fetch cases", err);
      } finally {
        setLoading(false);
      }
    };

    loadCases();
  }, []);

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      <Header />

      <div className="mt-6 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Overview of all reported cases
        </p>
      </div>

      {loading && (
        <div className="bg-white rounded-lg border p-6">
          <p className="text-gray-500">Loading cases...</p>
        </div>
      )}

      {!loading && cases.length === 0 && (
        <div className="bg-white rounded-lg border p-6">
          <p className="text-gray-600">
            No cases yet. Create your first case to get started.
          </p>
        </div>
      )}

      {!loading && cases.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c) => (
            <CaseCard key={c.id} caseData={c} />
          ))}
        </div>
      )}
    </div>
  );
}