import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterBar from "../../components/UserComps/JobSearch/FilterBar";
import JobCard from "../../components/UserComps/JobSearch/JobCard";
import SuggestedJobs from "../../components/UserComps/JobSearch/SuggestedJobs";
import UserMiniNavbar from "../../components/Others/UserMiniNavbar"

const JobSearch = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    title: null,
    company: null,
    skills: null
  });

  // Mock data for jobs
  const jobs = [
    {
      id: 1,
      title: "Front-end Developer",
      company: "TechCorp",
      jobDescription: "We are looking for an experienced Front-end Developer to join our dynamic team. The ideal candidate should have a strong understanding of React, JavaScript, and modern web technologies. You will be responsible for building user interfaces, implementing responsive designs, and collaborating with back-end developers.",
      skills: ["React", "JavaScript", "CSS", "HTML"],
      budget: "₹50,000-₹70,000",
      deadline: "2025-04-15"
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "DataSystems",
      jobDescription: "Join our backend team to develop scalable and efficient server-side applications. You'll work with databases, APIs, and cloud services to deliver robust solutions for our enterprise clients. Experience with Node.js, Python, or Java required.",
      skills: ["Node.js", "MongoDB", "Express", "AWS"],
      budget: "₹60,000-₹90,000",
      deadline: "2025-04-10"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "CreativeMinds",
      jobDescription: "We're seeking a talented UI/UX Designer to create beautiful, intuitive interfaces for our products. You should be proficient in design tools like Figma and have a strong portfolio showcasing your work. Knowledge of user research and testing methodologies is a plus.",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      budget: "₹45,000-₹65,000",
      deadline: "2025-04-20"
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "WebSolutions",
      jobDescription: "Looking for a versatile Full Stack Developer who can work on both client and server-side technologies. You'll be involved in all aspects of the development process, from designing database schemas to implementing frontend components.",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      budget: "₹70,000-₹100,000",
      deadline: "2025-04-05"
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudTech",
      jobDescription: "Join our DevOps team to streamline development workflows and implement CI/CD pipelines. You should have experience with containerization, cloud platforms, and automation tools. Knowledge of security best practices is essential.",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
      budget: "₹80,000-₹120,000",
      deadline: "2025-04-25"
    },
    {
      id: 6,
      title: "Mobile App Developer",
      company: "AppWorks",
      jobDescription: "We're looking for a skilled Mobile App Developer with experience in React Native or Flutter. You'll be responsible for building cross-platform mobile applications with smooth user experiences and implementing new features based on user feedback.",
      skills: ["React Native", "Flutter", "JavaScript", "Firebase"],
      budget: "₹65,000-₹85,000",
      deadline: "2025-04-30"
    }
  ];

  const handleCardClick = (job) => {
    // Navigate to job details page with job ID
    navigate(`/user/jobdetails/${job.id}`, { state: { job } });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter jobs based on all active filters
  const filteredJobs = jobs.filter(job => {
    // Check title filter
    if (filters.title && job.title !== filters.title) {
      return false;
    }
    
    // Check company filter
    if (filters.company && job.company !== filters.company) {
      return false;
    }
    
    // Check skills filter
    if (filters.skills && !job.skills.includes(filters.skills)) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      {/* Space for MiniNavbar component */}
      <div className="mini-navbar mb-6">
        <UserMiniNavbar/>
      </div>

      {/* Main content area */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left section (Filters + Job Cards) */}
        <div className="lg:w-2/3">
          <FilterBar 
            onFiltersChange={handleFiltersChange}
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onClick={() => handleCardClick(job)} 
              />
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="mt-6 p-4 bg-base-200 rounded-lg text-center">
              <p className="text-base-content">No jobs match your current filters.</p>
            </div>
          )}
        </div>

        {/* Right section (Suggested Jobs) */}
        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <SuggestedJobs jobs={jobs} onJobClick={handleCardClick} />
        </div>
      </div>
    </div>
  );
};

export default JobSearch;