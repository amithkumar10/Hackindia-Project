import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FilterBar from "../../components/UserComps/JobSearch/FilterBar";
import JobCard from "../../components/UserComps/JobSearch/JobCard";
import SuggestedJobs from "../../components/UserComps/JobSearch/SuggestedJobs";
import UserMiniNavbar from "../../components/Others/UserMiniNavbar";

const JobSearch = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    title: null,
    company: null,
    skills: null,
  });
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/freelancerjob/allJobs"
        );
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleCardClick = (job) => {
    navigate(`/user/jobdetails/${job._id}`, { state: { job } });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredJobs = jobs.filter((job) => {
    if (filters.title && job.title !== filters.title) {
      return false;
    }
    if (filters.company && job.company !== filters.company) {
      return false;
    }
    if (filters.skills && !job.skills.includes(filters.skills)) {
      return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mini-navbar mb-6">
        <UserMiniNavbar />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-2/3">
          <FilterBar onFiltersChange={handleFiltersChange} />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => handleCardClick(job)}
              />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="mt-6 p-4 bg-base-200 rounded-lg text-center">
              <p className="text-base-content">
                No jobs match your current filters.
              </p>
            </div>
          )}
        </div>

        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <SuggestedJobs jobs={jobs} onJobClick={handleCardClick} />
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
