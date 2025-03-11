import React, { useState, useEffect } from "react";
import axios from '../../utils/axiosConfig.js';
import JobCard from "../../components/CompanyComps/JobPostingsPage/JobCard";
import MiniNavbar from "../../components/Others/CompanyMiniNavbar";

const JobPostings = () => {
  const [jobs, setJobs] = useState([]); // Initialize jobs as an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const companyId = sessionStorage.getItem("companyId"); // Get companyId from sessionStorage
        if (!companyId) {
          setError("Company ID is missing. Please log in.");
          return;
        }
    
        const response = await axios.get(`/api/company/jobs/${companyId}`);

        console.log("API Response:", response.data);  // Log the response
    
        // Access jobs from the response object
        if (Array.isArray(response.data.jobs)) {
          setJobs(response.data.jobs);  // Update jobs state with the array inside 'jobs'
        } else {
          setError("Invalid response structure. Expected an array of jobs.");
        }
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
        console.error("Error fetching jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    

    fetchJobs();
  }, []);

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center gap-8 p-10">
      <MiniNavbar /> {/* MiniNavbar at the top */}

      <div className="mt-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">Job Postings</h1>
        <div className="mt-4 grid md:grid-cols-2 gap-6">
          {jobs.length === 0 ? (
            <div className="text-white">No jobs found.</div>
          ) : (
            jobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPostings;