import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MailBox from "../../components/CompanyComps/ApplicantsPage/MailBox";
import ShortlistedApplicantCard from "../../components/CompanyComps/ApplicantsPage/ShortlistedApplicantCard";
import ApplicantCard from "../../components/CompanyComps/ApplicantsPage/ApplicantCard";
import MiniNavbar from "../../components/Others/CompanyMiniNavbar";
import axios from "../../utils/axiosConfig.js";

const ApplicantsPage = () => {
  const [shortlisted, setShortlisted] = useState([]);
  const [viewShortlisted, setViewShortlisted] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [modalPosition, setModalPosition] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get params from URL
  const params = useParams();
  
  // Use the companyId and jobId from useParams if available, else fallback to sessionStorage
  const companyId = params.companyId || sessionStorage.getItem('companyId');
  const jobId = params.jobId || sessionStorage.getItem('jobId');

  useEffect(() => {
    if (!companyId || !jobId) {
      setError("Company ID or Job ID not found");
      setLoading(false);
      return;
    }

    fetchApplicants();
  }, [companyId, jobId]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      
      // Log the API URL to debug
      const apiUrl = `/api/company/jobApplicants/${companyId}/${jobId}`;
      console.log("Fetching from:", apiUrl);
      
      // Use axios instead of fetch
      const response = await axios.get(apiUrl);
      
      // Log the response status and full data structure
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
      
      // Check if we have the expected structure and handle differently based on what we get
      let applicantsData = [];
      
      if (response.data && response.data.applicants) {
        // Standard expected format: { message: '...', applicants: [...] }
        applicantsData = response.data.applicants;
      } else if (Array.isArray(response.data)) {
        // Handle case where response might be an array directly
        applicantsData = response.data;
      } else if (typeof response.data === 'object') {
        // Try to find an array property that might contain applicants
        const possibleArrays = Object.values(response.data).filter(val => Array.isArray(val));
        if (possibleArrays.length > 0) {
          // Use the first array found
          applicantsData = possibleArrays[0];
        }
      }
      
      console.log("Extracted applicants data:", applicantsData);
      
      // Make sure the applicants data is an array
      applicantsData = Array.isArray(applicantsData) ? applicantsData : [];
      
      setApplicants(applicantsData);
      setError(null);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setError(`Failed to fetch applicants: ${error.message}`);
      
      // For development/debugging, show sample data when API fails
      setApplicants([
        {
          _id: "sample1",
          name: "John Doe",
          email: "john@example.com",
          skills: ["React", "Node.js"],
          experience: "3 years"
        },
        {
          _id: "sample2",
          name: "Jane Smith",
          email: "jane@example.com",
          skills: ["UI/UX", "Frontend"],
          experience: "2 years"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

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
    setSelectedApplicant(applicant);
  };

  const handleMessage = (applicant) => {
    alert(`Messaging ${applicant.name}`);
  };

  const closeModal = () => {
    setSelectedApplicant(null);
  };

  return (
    <div className="p-6 min-h-screen relative">
      <MiniNavbar />
      <div className="mt-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl text-white font-bold">Job Applicants</h1>
          <div>
            <button
              onClick={() => setViewShortlisted(!viewShortlisted)}
              className="bg-gray-200 text-black px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-300 hover:scale-105"
            >
              {viewShortlisted ? "View All Applicants" : "View Shortlisted Applicants"}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-white text-center py-10">Loading applicants...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-10">{error}</div>
        ) : applicants.length === 0 ? (
          <div className="text-white text-center py-10">No applicants found for this job</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {viewShortlisted ? (
              shortlisted.length === 0 ? (
                <div className="col-span-3 text-white text-center py-10">
                  No freelancers shortlisted
                </div>
              ) : (
                applicants
                  .filter((applicant) => shortlisted.includes(applicant.name))
                  .map((applicant) => (
                    <ShortlistedApplicantCard
                      key={applicant._id || applicant.id || applicant.name}
                      applicant={applicant}
                      onHire={handleHire}
                      onMessage={handleMessage}
                    />
                  ))
              )
            ) : (
              applicants.map((applicant) => (
                applicant ? (
                  <ApplicantCard
                    key={applicant._id || applicant.id || applicant.name}
                    applicant={applicant}
                    onShortlist={handleShortlist}
                    shortlisted={shortlisted}
                  />
                ) : (
                  <div className="text-red-500">Applicant data is missing or incomplete</div>
                )
              ))
            )}
          </div>
        )}
      </div>

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
