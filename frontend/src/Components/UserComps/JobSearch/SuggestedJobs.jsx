import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axiosInstance from "../../../utils/axiosConfig.js";

const SuggestedJobs = ({ freelancerId, onJobClick }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      // Get the ID each time the effect runs
      const freelancerId = sessionStorage.getItem("userId");
      console.log("Attempting to fetch jobs for freelancerId:", freelancerId);

      if (!freelancerId) {
        console.log("No freelancerId found in sessionStorage");
        setError("User ID not found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(
          `api/freelancerjob/${freelancerId}`
        );
        console.log("API Response:", response.data);
        setJobs(response.data.jobs || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(
          "Failed to fetch jobs: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Remove freelancerId from dependency array if it's not defined outside

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const suggestedJobs = jobs.slice(0, 4);

  return (
    <div className="bg-base-200 rounded-xl p-4 border border-base-300 shadow">
      <h2 className="text-3xl font-bold mb-4">Suggested Jobs</h2>

      <div className="space-y-3">
        {suggestedJobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onClick={() => onJobClick(job)}
            isCompact={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedJobs;
