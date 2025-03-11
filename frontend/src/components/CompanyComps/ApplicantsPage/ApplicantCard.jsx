import { useState } from "react";
import { Mail, Phone, MapPin, Star, Users, Briefcase } from "lucide-react";

const ApplicantCard = ({ applicant, onShortlist, shortlisted = [] }) => {
  // No need to fetch data as it's passed directly
  
  if (!applicant) return <div className="bg-black border border-neutral-800 p-5 rounded-xl shadow-md w-full max-w-lg text-white">No applicant data</div>;

  // Destructure with default values for safety
  const {
    _id = "",
    freelancerId = {},
    bidAmount = 0,
    skills = [],
    experience = "Not specified",
    projectsWorkedOn = [],
    ratings = [],
    name = freelancerId.name || "No Name",
    email = freelancerId.email || "No Email",
    phone = freelancerId.phone || "No Phone",
    location = freelancerId.location || "No Location",
  } = applicant || {};

  // Safely calculate average rating
  const averageRating = Array.isArray(ratings) && ratings.length > 0
    ? ratings.reduce((acc, curr) => acc + (curr.rating || 0), 0) / ratings.length
    : 0;

  // Check if shortlisted
  const isShortlisted = Array.isArray(shortlisted) && shortlisted.includes(_id);



  return (
    <>
      {/* Applicant Card with Black Background, Neat Design */}
      <div
        className="bg-black border border-neutral-800 p-5 rounded-xl shadow-md w-full max-w-lg cursor-pointer transition hover:scale-[1.02] hover:shadow-lg"
        onClick={() => document.getElementById(`applicant_modal_${_id}`).showModal()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> {name}
          </h2>
          {isShortlisted && (
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
              Shortlisted
            </span>
          )}
        </div>

        <p className="text-white mt-2 font-semibold">
          {Array.isArray(skills) && skills.length > 0 
            ? skills.slice(0, 2).join(", ") 
            : "No skills listed"}
        </p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-sm text-yellow-400">
            <Star className="w-4 h-4" />
            <span className="font-bold">{averageRating.toFixed(1)}</span>
          </div>
          <p className="text-white text-sm font-bold">
            ₹{bidAmount}
          </p>
        </div>

        {/* Location Added to Card */}
        <div className="mt-2 flex items-center gap-2 text-sm text-white">
          <MapPin className="w-4 h-4 text-neutral-400" />
          <span>{location}</span>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="lex items-center gap-2 text-sm px-4 py-2 rounded-lg cursor-pointer transition bg-gray-200 text-black border-gray-800 ">
              Hire
          </button>
        </div>
      </div>

      {/* Modal with detailed applicant info */}
      <dialog id={`applicant_modal_${_id}`} className="modal">
        <div className="modal-box bg-black text-white p-6 w-full max-w-xl border rounded-2xl border-neutral-700">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-semibold text-xl">{name}</h3>
          <p className="text-sm text-neutral-400 mt-2">
            <Mail className="inline w-4 h-4 text-neutral-400 mr-2" />
            {email}
          </p>
          <p className="text-sm text-neutral-400">
            <Phone className="inline w-4 h-4 text-neutral-400 mr-2" />
            {phone}
          </p>
          <p className="text-sm text-neutral-400">
            <MapPin className="inline w-4 h-4 text-neutral-400 mr-2" />
            {location}
          </p>

          {/* Experience section with briefcase icon */}
          <div className="mt-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-neutral-400" /> Experience
            </h4>
            <p className="text-white text-sm">{experience}</p>
          </div>

          {/* Skills section */}
          <div className="mt-4">
            <h4 className="font-semibold text-lg">Skills</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.isArray(skills) && skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-xs">No skills listed</span>
              )}
            </div>
          </div>

          {/* Projects section */}
          <div className="mt-4">
            <h4 className="font-semibold text-lg">Projects Worked On</h4>
            {Array.isArray(projectsWorkedOn) && projectsWorkedOn.length > 0 ? (
              <ul className="list-disc ml-5 text-sm">
                {projectsWorkedOn.map((project, index) => (
                  <li key={index}>{project.projectName || "Unnamed Project"}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-neutral-400">No projects listed</p>
            )}
          </div>

          {/* Bid amount */}
          <div className="mt-4">
            <h4 className="font-semibold text-lg">Bid Amount</h4>
            <p className="text-white text-xl font-bold">₹{bidAmount}</p>
          </div>

          {/* Shortlist button in modal */}
          <div className="mt-6 flex justify-end">
          <button
            className="lex items-center gap-2 text-sm px-4 py-2 rounded-lg cursor-pointer transition bg-gray-200 text-black border-gray-800 ">
              Hire
          </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ApplicantCard;