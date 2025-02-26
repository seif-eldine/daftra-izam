import { useEffect, useState } from "react";

export interface Job{
  id: string;
  title: string;
  company: string;
  tags: string[];
  location: string;
  postedAt: string;
  criterias: string[];
  logoPath: string
}

// I create the static data outside of the component to NOT be tracked
const apiUrl = "http://localhost:8081/";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(`${apiUrl}jobs`);
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return { jobs, loading, error };
}
