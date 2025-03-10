import React, { useState, useEffect } from 'react';
import UserNavbar from '../../Components/Others/UserNavbar';
import ProfileInfo from '../../Components/UserComps/UserProfileComps/ProfileInfo';
import ProfilePicture from '../../Components/UserComps/UserProfileComps/ProfilePicture';
import ProjectsSection from '../../Components/UserComps/UserProfileComps/ProjectsSection';

const UserProfile = () => {
  // In a real app, this would come from authentication context or API
  const [isCurrentUser, setIsCurrentUser] = useState(true); // For demo purposes
  
  // Mock user data - in a real app, this would come from an API
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+91 9876543210",
    profilePic: "https://i.pravatar.cc/300?img=12",
    location: "Mumbai, India",
    title: "Full Stack Developer",
    skills: ["React.js", "Node.js", "TypeScript", "MongoDB", "Express", "AWS"],
    experience: "Over 5 years of experience in full-stack development with a focus on MERN stack. Specialized in building scalable web applications and RESTful APIs.\n\nPreviously worked at TechSolutions Inc. as a Senior Developer where I led a team of 4 developers to build an e-commerce platform.",
    projects: [
      {
        id: "1",
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform with product management, cart functionality, payment integration, and order tracking.",
        imageUrl: "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=E-commerce+Platform",
        projectUrl: "https://example.com/ecommerce",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"]
      },
      {
        id: "2",
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, task assignment, and progress tracking.",
        imageUrl: "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Task+Management",
        projectUrl: "https://example.com/taskmanager",
        technologies: ["React", "Firebase", "Material UI"]
      }
    ]
  });

  // Toggle between user and company view for demo purposes
  const toggleUserType = () => {
    setIsCurrentUser(!isCurrentUser);
  };

  // Update profile information
  const handleUpdateProfile = (updatedInfo) => {
    setUserData(prev => ({
      ...prev,
      ...updatedInfo
    }));
  };

  // Update profile picture
  const handleUpdateProfilePic = (imageUrl) => {
    setUserData(prev => ({
      ...prev,
      profilePic: imageUrl
    }));
  };

  // Update projects
  const handleUpdateProjects = (updatedProjects) => {
    setUserData(prev => ({
      ...prev,
      projects: updatedProjects
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <UserNavbar />
      
      <div className="p-4 md:p-6">
        <div className="max-w-3xl mx-auto"> {/* Changed from max-w-7xl to max-w-3xl to make the stacked layout narrower */}
          {/* Demo Toggle - Remove in production */}
          <div className="bg-zinc-800 rounded-lg p-4 mb-6 flex justify-between items-center">
            <p className="text-zinc-300">
              <span className="font-bold">Demo Mode:</span> Currently viewing as {isCurrentUser ? 'User (Edit enabled)' : 'Company (View only)'}
            </p>
            <button 
              onClick={toggleUserType}
              className="btn btn-sm bg-white text-black hover:bg-zinc-200 border-0 rounded-lg"
            >
              Switch to {isCurrentUser ? 'Company View' : 'User View'}
            </button>
          </div>
          
          {/* Stacked Layout - Profile Picture on top */}
          <div className="flex flex-col gap-6">
            {/* Profile Picture */}
            <div className="w-full">
              <ProfilePicture 
                profilePic={userData.profilePic}
                isCurrentUser={isCurrentUser}
                onUpdateProfilePic={handleUpdateProfilePic}
              />
            </div>
            
            {/* Profile Information */}
            <div className="w-full">
              <ProfileInfo 
                userData={userData}
                isCurrentUser={isCurrentUser}
                onUpdateProfile={handleUpdateProfile}
              />
            </div>
            
            {/* Projects Section */}
            <div className="w-full">
              <ProjectsSection 
                projects={userData.projects}
                isCurrentUser={isCurrentUser}
                onUpdateProjects={handleUpdateProjects}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;