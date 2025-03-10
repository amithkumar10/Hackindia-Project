import { useState } from "react";
import ApplicantCard from "../../components/CompanyComps/ApplicantsPage/ApplicantCard";
import ShortlistedApplicantCard from "../../components/CompanyComps/ApplicantsPage/ShortlistedApplicantCard";
import MiniNavbar from "../../components/Others/MiniNavbar";
import MailBox from "../../components/CompanyComps/ApplicantsPage/MailBox";

// Mock Data for Applicants
const mockApplicants = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    location: "Mumbai, India",
    skills: ["React", "Node.js", "MongoDB"],
    experience: "3 years in web development",
    bids: [
      {
        jobPostingId: "1",
        bidAmount: 1000,
      },
    ],
    ratings: [
      { companyId: "2", rating: 5, review: "Excellent" },
    ],
    projectsWorkedOn: [
      {
        projectName: "Project A",
        projectLink: "https://project-a.com",
        description: "A web app built with React.",
        timeline: "3 months",
        clientName: "Client X",
      },
    ],
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "0987654321",
    location: "Delhi, India",
    skills: ["JavaScript", "Express.js", "MySQL"],
    experience: "2 years in backend development",
    bids: [
      {
        jobPostingId: "2",
        bidAmount: 1200,
        bidStatus: "pending",
      },
    ],
    ratings: [
      { companyId: "1", rating: 3, review: "Decent" },
      { companyId: "3", rating: 4, review: "Good" },
    ],
    projectsWorkedOn: [
      {
        projectName: "Project B",
        projectLink: "https://project-b.com",
        description: "A REST API built with Express.",
        timeline: "4 months",
        clientName: "Client Y",
      },
    ],
  },
];

const ApplicantsPage = () => {
  const [shortlisted, setShortlisted] = useState([]);
  const [viewShortlisted, setViewShortlisted] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null); // Track selected applicant for mail
  const [modalPosition, setModalPosition] = useState(null); // Track modal position

  const handleShortlist = (applicantName) => {
    setShortlisted((prevShortlisted) => {
      if (prevShortlisted.includes(applicantName)) {
        return prevShortlisted.filter((name) => name !== applicantName);
      }
      return [...prevShortlisted, applicantName];
    });
  };

  const handleHire = (applicant, e) => {
    const { top, left } = e.target.getBoundingClientRect();
    setModalPosition({ top: top + window.scrollY, left: left });
    setSelectedApplicant(applicant); // Set the applicant to be hired
  };

  const handleMessage = (applicant) => {
    alert(`Messaging ${applicant.name}`);
    // Implement message logic here
  };

  const closeModal = () => {
    setSelectedApplicant(null); // Close the modal
  };

  return (
    <div className="p-6 min-h-screen relative">
      <MiniNavbar /> {/* MiniNavbar at the top */}

      <div className="mt-6"> {/* Added margin for space between MiniNavbar and content */}
        {/* Header and Button on the same line */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl text-white font-bold">Job Applicants</h1>
          <button
            onClick={() => setViewShortlisted(!viewShortlisted)}
            className="bg-gray-200 text-black px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-300 hover:scale-105"
          >
            {viewShortlisted ? "View All Applicants" : "View Shortlisted Applicants"}
          </button>
        </div>

        {/* Render Shortlisted Applicants or All Applicants */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {viewShortlisted ? (
            shortlisted.length === 0 ? (
              <div className="flex justify-end items-start min-h-screen mt-10 mr-6"> {/* Adjusted the position */}
                <p className="text-white pl-28 text-xl">No freelancers shortlisted</p> {/* Centered and bigger text */}
              </div>
            ) : (
              mockApplicants
                .filter((applicant) => shortlisted.includes(applicant.name))
                .map((applicant) => (
                  <ShortlistedApplicantCard
                    key={applicant.name}
                    applicant={applicant}
                    onHire={handleHire}
                    onMessage={handleMessage}
                  />
                ))
            )
          ) : (
            mockApplicants.map((applicant) => (
              <ApplicantCard
                key={applicant.name}
                applicant={applicant}
                onShortlist={handleShortlist}
                shortlisted={shortlisted}
              />
            ))
          )}
        </div>
      </div>

      {/* MailBox Modal */}
      {selectedApplicant && modalPosition && (
        <MailBox
          applicant={selectedApplicant}
          onClose={closeModal}
          modalPosition={modalPosition}
        />
      )}
    </div>
  );
};

export default ApplicantsPage;
