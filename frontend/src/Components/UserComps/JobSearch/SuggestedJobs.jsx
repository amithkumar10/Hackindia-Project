import React from "react";
import JobCard from "./JobCard";

const SuggestedJobs = ({ jobs, onJobClick }) => {
  // For suggested jobs section, we'll show a subset of the jobs
  const suggestedJobs = jobs.slice(0, 4);

  return (
    <div className="bg-base-200 rounded-xl p-4 border border-base-300 shadow">
      <h2 className="text-3xl font-bold mb-4">Suggested Jobs</h2>
      
      <div className="space-y-3">
        {suggestedJobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            onClick={() => onJobClick(job)}
            isCompact={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedJobs;