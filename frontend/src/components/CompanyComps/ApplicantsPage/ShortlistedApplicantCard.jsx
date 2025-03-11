import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Star, Users } from "lucide-react";

const ShortlistedApplicantCard = ({ applicant, jobId, onMessage }) => {
  const [updatedApplicant, setUpdatedApplicant] = useState(applicant);

  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        const response = await axios.get(`/api/company/applicant/${applicant.id}`);
        setUpdatedApplicant(response.data);
      } catch (error) {
        console.error("Error fetching updated applicant data:", error);
      }
    };
    fetchApplicantData();
  }, [applicant.id]);

  if (updatedApplicant.applicationStatus !== "shortlisted") return null;

  // Calculate average rating
  const averageRating =
    updatedApplicant.ratings.length > 0
      ? updatedApplicant.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
        updatedApplicant.ratings.length
      : 0;


  return (
    <div className="bg-black border border-neutral-800 p-5 rounded-xl shadow-md w-full max-w-lg mb-4">
      <div className="flex items-center justify-between ">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" /> {updatedApplicant.name}
        </h2>
        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
          Shortlisted
        </span>
      </div>

      <p className="text-white mt-2 font-semibold">
        {updatedApplicant.skills.slice(0, 2).join(", ") || "No skills listed"}
      </p>

      {/* Rating and Bid Amount */}
      <div className="mt-2 flex items-center justify-between gap-2 text-lg text-yellow-400">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4" />
          <span className="font-bold">{averageRating.toFixed(1)}</span>
        </div>
        <div className="text-white font-bold text-lg">
          ₹{updatedApplicant.bids[0]?.bidAmount || "0"}
        </div>
      </div>

      {/* Location */}
      <div className="mt-4 flex items-center gap-2 text-sm text-white">
        <MapPin className="w-4 h-4 text-neutral-400" />
        <span>{updatedApplicant.location}</span>
      </div>

      {/* Full Details */}
      <div className="mt-4 text-white">
        <p className="text-base mb-2"><strong>Email:</strong> {updatedApplicant.email}</p>
        <p className="text-base mb-2"><strong>Phone:</strong> {updatedApplicant.phone}</p>
        <p className="text-base mb-2"><strong>Experience:</strong> {updatedApplicant.experience}</p>
        <p className="text-base mb-2"><strong>Projects Worked On:</strong></p>
        <ul className="list-disc ml-5">
          {updatedApplicant.projectsWorkedOn.length > 0 ? (
            updatedApplicant.projectsWorkedOn.map((project, index) => (
              <li key={index}>
                <a
                  href={project.projectLink}
                  className="text-blue-400 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.projectName}
                </a>
              </li>
            ))
          ) : (
            <li>No projects listed</li>
          )}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4 justify-end">
        <button
          onClick={handleHireClick}
          className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer transition duration-200"
        >
          Hire
        </button>
        <button
          onClick={() => onMessage(updatedApplicant)}
          className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer transition duration-200"
        >
          Message
        </button>
      </div>
    </div>
  );
};

export default ShortlistedApplicantCard;