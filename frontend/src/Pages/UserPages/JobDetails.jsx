import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import UserMiniNavbar from "../../components/Others/UserMiniNavbar";
import axiosInstance from "../../utils/axiosConfig";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state || {};

  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);
  const [charge, setCharge] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [enhancedProposal, setEnhancedProposal] = useState("");

  // Handle case where page is refreshed and state is lost
  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-base-300">
        <div className="text-xl mb-4 text-base-content">
          Job details not found. Please return to the job search page.
        </div>
        <button
          className="btn btn-primary btn-md rounded-full"
          onClick={() => navigate("/user/jobsearch")}
        >
          Return to Job Search
        </button>
      </div>
    );
  }

  const enhanceProposal = async () => {
    if (!proposal.trim()) {
      alert("Please enter a proposal to enhance");
      return;
    }

    setLoading(true);
    try {
      const GEMINI_API_KEY = "AIzaSyC0-Si3Uo7tYK9NQPYEvsDdfkxav3sgaE8";

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Enhance this job proposal to make it more professional, compelling, and tailored to the job description. Keep your response concise and limited to one paragraph: "${proposal}". 
              Job title: ${job.title}
              Job description: ${job.jobDescription}
              Required skills: ${job.skills.join(", ")}`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 200,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const enhancedText = response.data.candidates[0].content.parts[0].text;
      setEnhancedProposal(enhancedText);
    } catch (error) {
      console.error("Error enhancing proposal:", error);
      alert("Failed to enhance your proposal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const useEnhancedProposal = () => {
    setProposal(enhancedProposal);
    setEnhancedProposal("");
  };

  const handleApply = async () => {
    try {
      const freelancerId = sessionStorage.getItem("userId");

      const jobId = id;

      if (!proposal.trim()) {
        alert("Please enter your proposal");
        return;
      }

      if (!charge.trim()) {
        alert("Please enter your charge");
        return;
      }

      const payload = {
        jobId: jobId,
        freelancerId: freelancerId,
        proposal: proposal,
        bidAmount: parseInt(charge, 10) || charge,
      };

      console.log("Submitting application with payload:", payload);

      const response = await axiosInstance.post(
        "api/freelancerjob/apply",
        payload
      );

      console.log("Application submitted successfully:", response.data);
      setIsApplied(true);
    } catch (error) {
      console.error(
        "Error applying for job:",
        error.response?.data || error.message
      );
      alert(
        "Failed to submit application: " +
          (error.response?.data?.message || "Please try again")
      );
    }
  };

  return (
    <div data-theme="black" className="min-h-screen bg-base-300">
      {/* Space for Mini Navbar */}
      <div id="mini-navbar-container">
        <UserMiniNavbar />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-4">
          <button
            className="btn btn-primary btn-md rounded-lg px-4 flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            onClick={() => navigate("/user/jobsearch")}
          >
            <ArrowLeft size={20} />
            <span className="text-base font-medium">Back</span>
          </button>
        </div>

        {/* Page Title - Centered and Larger */}
        <h1 className="text-3xl font-bold mb-4 text-base-content px-1 text-center">
          Job Details
        </h1>

        {/* Job Details Card */}
        <div className="card bg-base-100 shadow-md mb-6 rounded-xl overflow-hidden">
          <div className="card-body p-6">
            {/* Job Header */}
            <div className="border-b border-base-300 pb-4 mb-4">
              <h2 className="card-title text-xl mb-1">{job.title}</h2>
              <p className="text-lg opacity-70">{job.company}</p>
            </div>

            {/* Job Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="border border-base-300 rounded-lg p-3 shadow-sm">
                <h3 className="font-semibold mb-1 opacity-80 text-sm">
                  Budget
                </h3>
                <p className="font-medium">{job.budget}</p>
              </div>
              <div className="border border-base-300 rounded-lg p-3 shadow-sm">
                <h3 className="font-semibold mb-1 opacity-80 text-sm">
                  Deadline
                </h3>
                <p className="font-medium">
                  {new Date(job.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-5">
              <h3 className="font-semibold mb-2 text-sm">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-primary badge-md py-2 px-3 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2 text-sm">Job Description</h3>
              <div className="opacity-90 whitespace-pre-line bg-base-200 p-4 rounded-lg text-sm">
                {job.jobDescription}
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="card bg-base-100 shadow-md rounded-xl overflow-hidden">
          <div className="card-body p-6">
            <h2 className="card-title text-xl mb-4">Submit Your Proposal</h2>

            {isApplied ? (
              <div className="alert bg-primary text-primary-content shadow-md rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold text-sm">Application Submitted!</h3>
                  <div className="text-xs">
                    Your proposal has been sent to the employer.
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Proposal Input with improved spacing and white text */}
                <div className="form-control">
                  <label className="label pt-0">
                    <span className="label-text text-sm font-medium text-white">
                      Your Proposal
                    </span>
                  </label>
                  <div className="mt-2 mb-2">
                    <textarea
                      className="textarea textarea-bordered h-40 w-full rounded-lg text-sm resize-none focus:outline-primary text-white"
                      placeholder="Describe why you're a good fit for this job..."
                      value={proposal}
                      onChange={(e) => setProposal(e.target.value)}
                    />
                  </div>

                  <div className="flex">
                    <button
                      className="btn btn-secondary btn-sm rounded-lg mr-2"
                      onClick={enhanceProposal}
                      disabled={loading}
                    >
                      {loading ? "Enhancing..." : "Enhance with AI"}
                    </button>
                  </div>

                  {enhancedProposal && (
                    <div className="mt-4 p-4 border border-base-300 rounded-lg bg-base-200">
                      <h3 className="font-semibold text-sm mb-2">
                        Enhanced Proposal:
                      </h3>
                      <p className="text-sm whitespace-pre-line">
                        {enhancedProposal}
                      </p>
                      <div className="mt-3">
                        <button
                          className="btn btn-primary btn-sm rounded-lg"
                          onClick={useEnhancedProposal}
                        >
                          Use this proposal
                        </button>
                      </div>
                    </div>
                  )}

                  <label className="label pb-0">
                    <span className="label-text-alt text-xs opacity-70 text-white">
                      Provide details about your experience and approach
                    </span>
                  </label>
                </div>

                {/* Charge Input with white text */}
                <div className="form-control">
                  <label className="label pt-0">
                    <span className="label-text text-sm font-medium text-white">
                      Your Charge
                    </span>
                  </label>
                  <div className="mt-2 mb-2">
                    <input
                      type="text"
                      className="input input-bordered rounded-lg text-sm w-full md:w-1/2 focus:outline-primary text-white"
                      placeholder="Enter your price"
                      value={charge}
                      onChange={(e) => setCharge(e.target.value)}
                    />
                  </div>
                  <label className="label pb-0">
                    <span className="label-text-alt text-xs opacity-70 text-white">
                      Specify your rate (hourly or fixed)
                    </span>
                  </label>
                </div>

                {/* Apply Button - positioned better */}
                <div className="pt-2">
                  <button
                    className="btn btn-primary btn-md w-full md:w-auto px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
                    onClick={handleApply}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
