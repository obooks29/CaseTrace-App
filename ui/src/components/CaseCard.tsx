import { useNavigate } from "react-router-dom";
import { CaseItem } from "../types/case.types";

const priorityStyles: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-700",
  NORMAL: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-red-100 text-red-700",
};

export default function CaseCard({ caseData }: { caseData: CaseItem }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/case/${caseData.id}`)}
      className="bg-white border rounded-lg p-4 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900">
          {caseData.title}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            priorityStyles[caseData.priority]
          }`}
        >
          {caseData.priority}
        </span>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
        {caseData.description}
      </p>

      <div className="text-xs text-gray-500 flex justify-between">
        <span>Status: {caseData.status}</span>
        <span>
          {new Date(caseData.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}