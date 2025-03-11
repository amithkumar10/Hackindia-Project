import { useNavigate } from "react-router-dom";
import { Briefcase, IndianRupee, Calendar, Users } from "lucide-react";

const JobCard = ({ job, companyId }) => {
  const navigate = useNavigate();

  const handleViewApplicants = () => {
    // Check if companyId and jobId are valid
    if (!companyId || !job.id) {
      console.error("Invalid companyId or jobId");
      return;
    }

    // Store companyId and jobId in sessionStorage
    sessionStorage.setItem('companyId', companyId);
    sessionStorage.setItem('jobId', job.id);  // Store the jobId from the card

    // Navigate to the route with companyId and jobId
    navigate(`/company/${companyId}/job/${job.id}/applicants`);
  };

  return (
    <div className="bg-black border border-neutral-800 p-5 rounded-xl shadow-md w-full sm:w-[300px] md:w-[350px] lg:w-[400px] transition hover:scale-[1.02] hover:shadow-lg">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-primary" /> {job.title}
      </h2>
      <p className="text-neutral-400 mt-2">{job.jobDescription}</p>

      <div className="mt-3">
        <span className="text-sm text-neutral-500">Skills:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-neutral-900 text-neutral-200 text-xs px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-white flex items-center gap-1">
          <IndianRupee className="w-4 h-4 text-primary" />{" "}
          {job.budget.toLocaleString()}
        </p>
        <p className="text-neutral-400 flex items-center gap-1 text-sm">
          <Calendar className="w-4 h-4 text-primary" />{" "}
          {new Date(job.deadline).toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleViewApplicants}
          className="flex items-center gap-2 text-sm text-black bg-gray-200 px-4 py-2 border-2 border-gray-800 rounded-lg cursor-pointer transition"
        >
          <Users className="w-5 h-5" />
          View Applicants
        </button>
      </div>
    </div>
  );
};

export default JobCard;
