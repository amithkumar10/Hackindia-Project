import { Mail, Phone, MapPin, Star, Users } from "lucide-react";

const ShortlistedApplicantCard = ({ applicant, onHire, onMessage }) => {
  // Calculate average rating
  const averageRating =
    applicant.ratings.length > 0
      ? applicant.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
        applicant.ratings.length
      : 0;

  const handleHireClick = (e) => {
    onHire(applicant, e); // Pass the event along with the applicant
  };

  return (
    <div className="bg-black border border-neutral-800 p-5 rounded-xl shadow-md w-full max-w-lg mb-4">
      <div className="flex items-center justify-between ">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" /> {applicant.name}
        </h2>
        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
          Shortlisted
        </span>
      </div>

      <p className="text-white mt-2 font-semibold">{applicant.skills.slice(0, 2).join(", ")}</p>

      {/* Rating */}
      <div className="mt-2 flex items-center justify-between gap-2 text-lg text-yellow-400">
  <div className="flex items-center gap-2">
    <Star className="w-4 h-4" />
    <span className="font-bold">{averageRating.toFixed(1)}</span>
  </div>
  <div className="text-white font-bold text-lg ">
    {`₹${applicant.bids[0]?.bidAmount || '0'}`}
  </div>
</div>


      {/* Price above buttons */}


      {/* Location */}
      <div className="mt-4 flex items-center gap-2 text-sm text-white">
        <MapPin className="w-4 h-4 text-neutral-400" />
        <span>{applicant.location}</span>
      </div>

      {/* Full Details */}
      <div className="mt-4 text-white">
        <p className="text-base mb-2"><strong>Email:</strong> {applicant.email}</p>
        <p className="text-base mb-2"><strong>Phone:</strong> {applicant.phone}</p>
        <p className="text-base mb-2"><strong>Experience:</strong> {applicant.experience}</p>
        <p className="text-base mb-2"><strong>Projects Worked On:</strong></p>
        <ul className="list-disc ml-5">
          {applicant.projectsWorkedOn.map((project, index) => (
            <li key={index}>
              <p
                href={project.projectLink}
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.projectName}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4 justify-end">
        <button
          onClick={handleHireClick} // Ensure the event is passed here
          className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer transition duration-200"
        >
          Hire
        </button>
        <button
          onClick={() => onMessage(applicant)}
          className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer transition duration-200"
        >
          Message
        </button>
      </div>
    </div>
  );
};

export default ShortlistedApplicantCard;
