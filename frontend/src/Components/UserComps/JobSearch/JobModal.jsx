import React from "react";

const JobModal = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/80 flex items-center justify-center p-4">
      <div className="relative bg-base-100 rounded-xl w-full max-w-2xl shadow-xl">
        <button
          className="btn btn-sm btn-circle absolute right-4 top-4 z-10"
          onClick={onClose}
        >
          ✕
        </button>
        
        <div className="p-6">
          <h3 className="font-bold text-2xl mb-1">{job.title}</h3>
          <p className="text-lg mb-3">{job.company}</p>
          
          <div className="divider"></div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-base">Budget</h4>
              <p className="text-primary font-medium">{job.budget}</p>
            </div>
            <div>
              <h4 className="font-semibold text-base">Deadline</h4>
              <p>{new Date(job.deadline).toLocaleDateString()}</p>
            </div>
          </div>
          
          <h4 className="font-semibold text-base mt-4">Required Skills</h4>
          <div className="flex flex-wrap gap-2 my-2">
            {job.skills.map((skill, index) => (
              <span key={index} className="badge badge-lg rounded-lg">
                {skill}
              </span>
            ))}
          </div>
          
          <div className="divider"></div>
          
          <h4 className="font-semibold text-lg mt-4">Job Description</h4>
          <p className="mt-2 text-base-content/80">{job.jobDescription}</p>
          
          <div className="mt-6">
            <button className="btn btn-primary rounded-lg">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;