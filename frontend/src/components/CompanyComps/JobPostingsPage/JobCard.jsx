import { Briefcase, IndianRupee, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
const JobCard = ({ job }) => {
  const handleViewApplicants = () => {
    // Placeholder action: You can replace this with modal or any other logic
    console.log(`Viewing applicants for job: ${job.title}`);
  };

  return (
    <div className="bg-black border border-neutral-800 p-5 rounded-xl shadow-md w-full max-w-lg transition hover:scale-[1.02] hover:shadow-lg">
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
      <Link to="/company/applicants">
      <button
          onClick={handleViewApplicants}
          className="flex items-center gap-2 text-sm text-black bg-gray-200 px-4 py-2 border-2 border-gray-800 rounded-lg cursor-pointer transition"
        >
          <Users className="w-5 h-5" />
          View Applicants
        </button></Link>

      </div>
    </div>
  );
};

export default JobCard;
