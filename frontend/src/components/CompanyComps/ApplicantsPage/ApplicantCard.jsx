import { useState } from "react";
import { Mail, Phone, MapPin, Star, Users } from "lucide-react";

const ApplicantCard = ({ applicant, onShortlist, shortlisted }) => {
  const isShortlisted = shortlisted.includes(applicant.name); // Check if shortlisted

  // Shortlist button toggle
  const handleShortlist = () => {
    onShortlist(applicant.name); // Update shortlist status
  };

  // Calculate average rating
  const averageRating = applicant.ratings.reduce((acc, curr) => acc + curr.rating, 0) / applicant.ratings.length || 0;

  return (
    <>
      {/* Applicant Card with Black Background, Neat Design */}
      <div
        className="bg-black border border-neutral-800 p-5 rounded-xl shadow-md w-full max-w-lg cursor-pointer transition hover:scale-[1.02] hover:shadow-lg"
        onClick={() => document.getElementById(`applicant_modal_${applicant.name}`).showModal()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> {applicant.name}
          </h2>
          {isShortlisted && (
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
              Shortlisted
            </span>
          )}
        </div>

        <p className="text-white mt-2 font-semibold">{applicant.skills.slice(0, 2).join(", ")}</p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-sm text-yellow-400">
            <Star className="w-4 h-4" />
            <span className="font-bold">{averageRating.toFixed(1)}</span>
          </div>
          <p className="text-white text-sm font-bold">{`₹${applicant.bids[0]?.bidAmount || '0'}`}</p>
        </div>

        {/* Location Added to Card */}
        <div className="mt-2 flex items-center gap-2 text-sm text-white">
          <MapPin className="w-4 h-4 text-neutral-400" />
          <span>{applicant.location}</span>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent modal from opening
              handleShortlist();
            }}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg cursor-pointer transition ${isShortlisted ? 'bg-green-600 text-white border-green-600' : 'bg-gray-200 text-black border-gray-800 hover:bg-green-500 hover:border-green-500'}`}
          >
            {isShortlisted ? "Shortlisted" : "Shortlist"}
          </button>
        </div>
      </div>

      {/* Modal with detailed applicant info */}
      <dialog id={`applicant_modal_${applicant.name}`} className="modal">
        <div className="modal-box bg-black text-white p-6 w-[600px] border rounded-2xl border-neutral-700">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-semibold text-xl">{applicant.name}</h3>
          <p className="text-sm text-neutral-400 mt-2">
            <Mail className="inline w-4 h-4 text-neutral-400 mr-2" />
            {applicant.email}
          </p>
          <p className="text-sm text-neutral-400">
            <Phone className="inline w-4 h-4 text-neutral-400 mr-2" />
            {applicant.phone}
          </p>
          <p className="text-sm text-neutral-400">
            <MapPin className="inline w-4 h-4 text-neutral-400 mr-2" />
            {applicant.location}
          </p>

          <h4 className="mt-4 font-semibold text-lg">Skills</h4>
          <ul className="list-disc ml-5 text-sm">
            {applicant.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h4 className="mt-4 font-semibold text-lg">Experience</h4>
          <p className="text-white text-sm">{applicant.experience}</p>

          <h4 className="mt-4 font-semibold text-lg">Projects Worked On</h4>
          <ul className="list-disc ml-5 text-sm">
            {applicant.projectsWorkedOn.map((project, index) => (
              <li key={index}>{project.projectName}</li>
            ))}
          </ul>

          <div className="mt-4 flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent closing modal when clicking shortlist
                handleShortlist();
              }}
              className={`bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-green-500 cursor-pointer transition duration-200 ${isShortlisted ? 'hidden' : ''}`}
            >
              {isShortlisted ? "Shortlisted" : "Shortlist"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ApplicantCard;
