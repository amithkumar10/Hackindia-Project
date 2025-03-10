import React from "react";

const JobCard = ({ job, onClick, isCompact = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div 
      className={`card bg-base-200 border border-base-300 shadow hover:shadow-lg transition-all cursor-pointer rounded-xl ${
        isCompact ? "p-2" : "p-3"
      }`}
    >
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <h2 className={`card-title ${isCompact ? "text-lg" : "text-xl"}`}>{job.title}</h2>
          <div className="badge badge-primary rounded-lg">{job.budget}</div>
        </div>
        
        <p className={`${isCompact ? "text-sm" : "text-base"} text-base-content/70`}>
          {job.company}
        </p>
        
        <div className="mt-2">
          <div className="flex flex-wrap gap-1">
            {job.skills.map((skill, index) => (
              <span key={index} className="badge badge-outline badge-sm rounded-lg">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="text-sm">
            Deadline: <span className="font-semibold">{formatDate(job.deadline)}</span>
          </div>
          
          <button 
            className={`${isCompact ? "btn btn-xs btn-outline" : "btn btn-sm btn-outline"} rounded-lg`} 
            onClick={(e) => {
              e.stopPropagation();
              onClick(job);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;