import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../Components/Others/UserNavbar";
import AppliedJobCard from "../../Components/UserComps/AppliedJobs/appliedjobCard";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const userId = sessionStorage.getItem("userId");

      if (!userId) {
        console.error("User ID not found in sessionStorage");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/freelancerjob/applications/${userId}`
        );
        console.log("Fetched applications:", response.data);
        setApplications(response.data.applications);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <UserNavbar />
      <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {applications.length > 0 ? (
          applications.map((app, index) => (
            <AppliedJobCard
              key={index}
              title={app.jobId?.title || app.title}
              jobDescription={app.jobId?.jobDescription || app.jobDescription}
              budget={app.jobId?.budget || app.budget}
              bidAmount={app.bidAmount}
              applicationStatus={app.applicationStatus}
            />
          ))
        ) : (
          <p className="text-center text-gray-400 mt-10">
            No jobs applied yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
