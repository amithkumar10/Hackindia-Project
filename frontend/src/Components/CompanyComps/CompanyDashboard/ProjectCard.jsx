import React from 'react';

const ProjectCard = ({ title, status, deadline, freelancer, progress }) => {
  return (
    <div className="bg-zinc-800 p-5 rounded-lg">
      <div className="flex justify-between items-center">
        <h4 className="text-white text-lg font-medium">{title}</h4>
        <span className="px-3 py-1 bg-zinc-700 rounded-full text-sm text-white">{status}</span>
      </div>
      <div className="mt-3 flex justify-between text-sm text-gray-400">
        <span>Deadline: {deadline}</span>
        <span>Assigned to: {freelancer}</span>
      </div>
      <div className="mt-3 w-full bg-zinc-700 rounded-full h-2.5">
        <div 
          className="bg-white h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProjectCard; 