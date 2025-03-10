import React, { useState } from 'react';
import Navbar from "../../Components/Others/Navbar.jsx";
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import StatCard from '../../Components/CompanyComps/CompanyDashboard/StatCard.jsx';
import ProjectCard from '../../Components/CompanyComps/CompanyDashboard/ProjectCard.jsx';
import DeadlineItem from '../../Components/CompanyComps/CompanyDashboard/DeadlineItem.jsx';
import NotificationItem from '../../Components/CompanyComps/CompanyDashboard/NotificationItem.jsx';
import QuickActionCard from '../../Components/CompanyComps/CompanyDashboard/QuickActionCard.jsx';
import Footer from '../../Components/Others/Footer.jsx';

// Register Chart.js components
Chart.register(...registerables);

const CompanyDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("month");
  
  // Updated mock data with rupee values
  const dashboardData = {
    totalJobs: 93,
    activeJobs: 15,
    completedJobs: 68,
    cancelledJobs: 10,
    totalApplications: 243,
    avgJobCost: 58000, // Changed to rupees
    totalSpent: 3950000, // Changed to rupees
    totalBids: 287,
    avgBidAmount: 61000, // Changed to rupees
    topSkills: ["React", "Node.js", "UI/UX", "MongoDB", "TypeScript"],
    skillsDistribution: [28, 23, 19, 15, 8],
    jobStatusCounts: [15, 68, 10], // Active, Completed, Cancelled
    highestRatedFreelancers: [
      { name: "John Doe", field: "Web Development", rating: 4.9, jobsCompleted: 7 },
      { name: "Jane Smith", field: "UI/UX Design", rating: 4.8, jobsCompleted: 5 },
      { name: "Mike Johnson", field: "Backend Development", rating: 4.7, jobsCompleted: 4 },
    ],
    activeProjects: [
      { 
        title: "E-commerce Website Redesign", 
        status: "In Progress", 
        deadline: "15 Aug 2023", 
        freelancer: "John Doe", 
        progress: 65 
      },
      { 
        title: "Mobile App Development", 
        status: "In Progress", 
        deadline: "30 Sep 2023", 
        freelancer: "Jane Smith", 
        progress: 40 
      }
    ],
    recentActivity: [
      { type: "Job Posted", title: "Frontend Developer for E-commerce Site", date: "2 days ago" },
      { type: "Bid Accepted", title: "Database Migration Specialist", date: "3 days ago" },
      { type: "Job Completed", title: "Mobile App UI Design", date: "5 days ago" },
      { type: "New Application", title: "Backend Developer Needed", date: "6 days ago" },
    ]
  };

  // Chart data for Job Trends
  const jobTrendsData = {
    labels: timeFilter === "month" ? 
      ["Week 1", "Week 2", "Week 3", "Week 4"] : 
      ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Posted Jobs",
        data: timeFilter === "month" ? [8, 12, 9, 15] : [15, 23, 18, 12, 25, 32],
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Completed Jobs",
        data: timeFilter === "month" ? [5, 8, 6, 12] : [10, 18, 13, 9, 20, 25],
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderColor: "rgba(255, 255, 255, 0.6)",
        borderWidth: 1,
      }
    ],
  };

  // Updated bid trends data with rupee values
  const bidTrendsData = {
    labels: timeFilter === "month" ? 
      ["Week 1", "Week 2", "Week 3", "Week 4"] : 
      ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Average Bid Amount (₹)",
        data: timeFilter === "month" ? 
          [52000, 58000, 55000, 69000] : 
          [49000, 53000, 57000, 55000, 61000, 65000],
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart data for Job Status
  const jobStatusData = {
    labels: ["Active", "Completed", "Cancelled"],
    datasets: [
      {
        data: dashboardData.jobStatusCounts,
        backgroundColor: [
          "rgba(255, 255, 255, 0.9)",
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.3)"
        ],
        borderColor: [
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 0.7)",
          "rgba(255, 255, 255, 0.4)"
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for Skills Distribution
  const skillsData = {
    labels: dashboardData.topSkills,
    datasets: [
      {
        label: "Skill Distribution",
        data: dashboardData.skillsDistribution,
        backgroundColor: [
          "rgba(255, 255, 255, 0.9)",
          "rgba(255, 255, 255, 0.75)",
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.45)",
          "rgba(255, 255, 255, 0.3)"
        ],
        borderColor: [
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 0.85)",
          "rgba(255, 255, 255, 0.7)",
          "rgba(255, 255, 255, 0.55)",
          "rgba(255, 255, 255, 0.4)"
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = { 
    responsive: true, 
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    },
    plugins: { 
      legend: { 
        display: true,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)'
      }
    } 
  };

  // Doughnut chart options
  const doughnutOptions = { 
    responsive: true, 
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        position: 'bottom',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)'
      }
    } 
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Company Dashboard</h1>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 text-sm rounded ${timeFilter === "month" ? "bg-white text-black" : "bg-transparent text-white border border-white"}`}
              onClick={() => setTimeFilter("month")}
            >
              Month
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded ${timeFilter === "halfyear" ? "bg-white text-black" : "bg-transparent text-white border border-white"}`}
              onClick={() => setTimeFilter("halfyear")}
            >
              6 Months
            </button>
          </div>
        </div>

        {/* Updated Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            title="Active Jobs" 
            value={dashboardData.activeJobs} 
            subtitle="↗︎ 25% from last month"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-10 h-10 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            }
          />
          
          <StatCard 
            title="Total Applications" 
            value={dashboardData.totalApplications} 
            subtitle="↗︎ 14% from last month"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-10 h-10 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            }
          />
          
          <StatCard 
            title="Avg. Job Cost" 
            value={dashboardData.avgJobCost} 
            subtitle="↘︎ 7% from last month"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            }
            isRupee={true}
          />
          
          <StatCard 
            title="Total Spent" 
            value={dashboardData.totalSpent} 
            subtitle="Since joining"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            }
            isRupee={true}
          />
        </div>

        {/* New Sleek Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Actions Panel */}
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-lg lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-white">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <QuickActionCard 
                title="Post a Job"
                description="Create a new job listing"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                }
              />
              
              <QuickActionCard 
                title="Find Talent"
                description="Browse freelancer profiles"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
              
              <QuickActionCard 
                title="View Projects"
                description="Manage all your projects"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
              />
            </div>
            
            <div className="mt-6">
              <h3 className="text-white font-medium mb-3">Active Projects</h3>
              <div className="space-y-3">
                {dashboardData.activeProjects.map((project, index) => (
                  <ProjectCard 
                    key={index}
                    title={project.title}
                    status={project.status}
                    deadline={project.deadline}
                    freelancer={project.freelancer}
                    progress={project.progress}
                  />
                ))}
              </div>
              <div className="mt-4 text-center">
                <button className="px-4 py-2 text-sm border border-white rounded text-white hover:bg-white hover:text-black transition-colors">
                  View All Projects
                </button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-white">Upcoming Deadlines</h2>
              <div className="space-y-3">
                <DeadlineItem 
                  title="Logo Design"
                  dueTime="Due in 2 days"
                  priority="high"
                />
                <DeadlineItem 
                  title="Content Writing"
                  dueTime="Due in 5 days"
                  priority="medium"
                />
                <DeadlineItem 
                  title="UI/UX Design"
                  dueTime="Due in 8 days"
                  priority="low"
                />
              </div>
            </div>
            
            {/* Recent Notifications */}
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-white">Notifications</h2>
              <div className="space-y-3">
                <NotificationItem 
                  title="New message from John Doe"
                  time="2 hours ago"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  }
                />
                
                <NotificationItem 
                  title="Project milestone completed"
                  time="Yesterday"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  }
                />
                
                <NotificationItem 
                  title="5 new applicants for your job"
                  time="2 days ago"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  }
                />
              </div>
              <button className="w-full mt-4 px-4 py-2 text-xs border border-white rounded text-white hover:bg-white hover:text-black transition-colors">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyDashboard;