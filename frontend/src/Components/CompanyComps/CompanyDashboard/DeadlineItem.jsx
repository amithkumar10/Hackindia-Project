import React from 'react';

const DeadlineItem = ({ title, daysRemaining, urgency = 'high' }) => {
  // Determine border color based on urgency
  const borderColor = 
    urgency === 'high' ? 'border-white' : 
    urgency === 'medium' ? 'border-gray-500' : 
    'border-gray-700';
  
  return (
    <div className={`flex items-center p-2 border-l-2 ${borderColor}`}>
      <div className="ml-2">
        <p className="text-white font-medium">{title}</p>
        <p className="text-gray-400 text-xs">Due in {daysRemaining} days</p>
      </div>
    </div>
  );
};

export default DeadlineItem; 