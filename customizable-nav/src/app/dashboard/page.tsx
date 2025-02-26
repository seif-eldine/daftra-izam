"use client";
import JobCard from "@/components/JobCard/JobCard";
import { useJobs } from "@/hooks/useJobs";

export default function DashboardPage() {
  const { jobs, loading, error } = useJobs();

  return (
    <div className="px-3">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error} please reload</p>}
      {jobs.map((job) => (
        <div key={job.id} className="my-3">
          <JobCard job={job} />
        </div>
      ))}
    </div>
  );
}
