import React from "react";
import {
  Briefcase,
  User,
  MessageSquare,
  BarChart,
  Star,
  StarHalf,
  Star as StarOutline,
} from "lucide-react";
import UserNavbar from "../../Components/Others/UserNavbar";
import Footer from "../../Components/Others/Footer";

const UserDashboard = () => {
  // Mock user data
  const userData = {
    name: "Ved Kamat",
    title: "Full Stack Developer",
    rating: 4.8,
    completedProjects: 47,
    joinedDate: "March 2022",
    earnings: "₹12,50,000",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  // Mock skills data with proficiency levels
  const skills = [
    { name: "React.js", proficiency: 90 },
    { name: "Node.js", proficiency: 85 },
    { name: "TypeScript", proficiency: 80 },
    { name: "UI/UX Design", proficiency: 75 },
    { name: "MongoDB", proficiency: 70 },
    { name: "AWS", proficiency: 65 },
  ];

  // Mock ongoing projects
  const ongoingProjects = [
    {
      id: 1,
      title: "E-commerce Platform Redesign",
      client: "TechRetail Inc.",
      deadline: "June 15, 2024",
      progress: 75,
      payment: "₹85,000",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Mobile Banking App Development",
      client: "FinSecure Solutions",
      deadline: "July 30, 2024",
      progress: 40,
      payment: "₹1,20,000",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Healthcare Dashboard",
      client: "MediCare Systems",
      deadline: "August 10, 2024",
      progress: 25,
      payment: "₹65,000",
      status: "In Progress",
    },
  ];

  // Mock recent reviews
  const recentReviews = [
    {
      client: "Sarah Williams",
      company: "DesignHub Co.",
      rating: 5,
      comment:
        "Alex delivered exceptional work on our website redesign. Highly recommended!",
      date: "2 weeks ago",
    },
    {
      client: "Michael Chen",
      company: "TechInnovate",
      rating: 4.5,
      comment:
        "Great communication and delivered on time. Would work with again.",
      date: "1 month ago",
    },
  ];

  // Mock upcoming deadlines
  const upcomingDeadlines = [
    { project: "API Integration", deadline: "May 25, 2024", daysLeft: 5 },
    { project: "Frontend Mockups", deadline: "May 30, 2024", daysLeft: 10 },
    { project: "Database Migration", deadline: "June 5, 2024", daysLeft: 16 },
  ];

  // Quick actions
  const quickActions = [
    {
      title: "Find Projects",
      description: "Browse new opportunities",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      title: "Update Profile",
      description: "Edit your information",
      icon: <User className="w-5 h-5" />,
    },
    {
      title: "Messages",
      description: "Check client communications",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      title: "Analytics",
      description: "View your performance",
      icon: <BarChart className="w-5 h-5" />,
    },
  ];

  // Render stars for ratings using Lucide icons
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-4 h-4 text-white fill-white" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="w-4 h-4 text-white fill-white" />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarOutline key={`empty-${i}`} className="w-4 h-4 text-zinc-600" />
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <UserNavbar />

      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Quick Actions - Moved to Top */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 hover:border-white transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 bg-zinc-800 rounded-full mb-2 flex items-center justify-center">
                  {action.icon}
                </div>
                <h3 className="font-bold">{action.title}</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {action.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bento Box Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* User Profile - Spans 2 columns on medium screens and up */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 md:col-span-2">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar Section */}
                  <div className="flex-shrink-0 flex justify-center md:justify-start">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-zinc-800 border-4 border-zinc-700 overflow-hidden">
                      <img
                        src={userData.avatar}
                        alt={userData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* User Info Section */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-3xl font-bold">
                          {userData.name}
                        </h1>
                        <p className="text-lg text-zinc-400">
                          {userData.title}
                        </p>
                        <div className="flex items-center mt-2 justify-center md:justify-start">
                          <div className="mr-2 flex">
                            {renderStars(userData.rating)}
                          </div>
                          <span className="text-white font-bold">
                            {userData.rating}
                          </span>
                          <span className="text-zinc-400 ml-2">
                            ({userData.completedProjects} projects)
                          </span>
                        </div>
                        <p className="text-zinc-400 mt-1">
                          Member since {userData.joinedDate}
                        </p>
                      </div>

                      <div className="mt-4 md:mt-0 bg-zinc-800 p-4 rounded-lg border border-zinc-700 flex flex-col items-center md:items-start">
                        <div className="text-zinc-400 text-sm">
                          Total Earnings
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-white">
                          {userData.earnings}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-6 h-px bg-zinc-800"></div>

                {/* Skills Section */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {skills.slice(0, 4).map((skill, index) => (
                    <div
                      key={index}
                      className="badge bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700"
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines - 1 column */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
              <div className="space-y-3">
                {upcomingDeadlines.map((item, index) => (
                  <div
                    key={index}
                    className="bg-zinc-800 rounded-lg p-3 flex justify-between items-center border border-zinc-700"
                  >
                    <div>
                      <h3 className="font-bold">{item.project}</h3>
                      <p className="text-zinc-400 text-xs">{item.deadline}</p>
                    </div>
                    <div
                      className={`badge ${
                        item.daysLeft <= 5
                          ? "bg-white text-black"
                          : "bg-zinc-700 text-white"
                      } border-zinc-600 rounded-lg`}
                    >
                      {item.daysLeft} days
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ongoing Projects - Spans 2 columns */}
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Ongoing Projects</h2>
              <div className="space-y-4">
                {ongoingProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-zinc-800 rounded-lg p-4 border border-zinc-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{project.title}</h3>
                        <p className="text-zinc-400 text-sm">
                          Client: {project.client}
                        </p>
                      </div>
                      <div className="badge bg-white text-black border-white rounded-lg">
                        {project.status}
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-zinc-700 h-2 rounded-full">
                        <div
                          className="bg-white h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-3 text-sm">
                      <div>
                        <p className="text-zinc-400">Deadline</p>
                        <p>{project.deadline}</p>
                      </div>
                      <div>
                        <p className="text-zinc-400">Payment</p>
                        <p className="text-white font-bold">
                          {project.payment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section - 1 column - REFORMATTED */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="px-3 py-2">
                <h2 className="text-base font-bold mb-3">Skills & Expertise</h2>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{skill.name}</span>
                        <span className="text-right">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-1.5">
                        <div
                          className="bg-white h-1.5"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Reviews - Spans 3 columns on medium screens and up - STYLED LIKE IMAGE */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 md:col-span-3">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold">Recent Reviews</h2>
                  <button className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-black rounded-lg">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {recentReviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-zinc-800 rounded-lg p-4 border border-zinc-700"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{review.client}</h3>
                          <p className="text-zinc-400 text-xs">
                            {review.company}
                          </p>
                        </div>
                        <div className="flex">{renderStars(review.rating)}</div>
                      </div>
                      <p className="mt-2 text-zinc-300 text-sm">
                        "{review.comment}"
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-zinc-400 text-xs">{review.date}</p>
                        <button className="text-xs text-zinc-400 hover:text-white">
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar */}
      <Footer />
    </div>
  );
};

export default UserDashboard;
