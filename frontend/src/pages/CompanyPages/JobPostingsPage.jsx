import JobCard from '../../components/CompanyComps/JobPostingsPage/JobCard'
import MiniNavbar from '../../components/Others/MiniNavbar';

const JobPostings = () => {
  const mockJobs = [
    {
      title: "Frontend Developer",
      jobDescription: "Looking for a React developer with Tailwind CSS experience.",
      skills: ["React.js", "Tailwind CSS", "JavaScript"],
      budget: 50000,
      deadline: "2025-03-30",
    },
    {
      title: "Backend Developer",
      jobDescription: "Seeking a Node.js expert with MongoDB knowledge.",
      skills: ["Node.js", "Express", "MongoDB"],
      budget: 60000,
      deadline: "2025-04-10",
    },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center gap-8 p-10">
      <MiniNavbar /> {/* MiniNavbar at the top */}
      
      <div className="mt-4"> {/* Added margin for space between MiniNavbar and content */}
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Job Postings
        </h1>
        <div className=" mt-4 grid md:grid-cols-2 gap-6">
          {mockJobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobPostings;
