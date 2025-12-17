import { useEffect, useState } from "react";
import { fetchCases } from "../api/api";
import { CaseItem } from "../types/case.types";

export default function useCases() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases().then((data) => {
      setCases(data);
      setLoading(false);
    });
  }, []);

  return { cases, loading };
}
