import { useEffect, useState } from "react";
import { loadCsv } from "../utils/dashboard/loadCsv";

export default function useDashboardData(file) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function fetchData() {
      try {
        setLoading(true);

        const result = await loadCsv(`/dashboard/${file}`);

        if (active) {
          setData(result);
        }
      } catch (err) {
        if (active) {
          setError(err);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      active = false;
    };
  }, [file]);

  return {
    data,
    loading,
    error,
  };
}