import React from 'react';

const NotificationItem = ({ icon, message, time }) => {
  return (
    <div className="flex items-start">
      <div className="bg-zinc-800 p-2 rounded-full mr-3">
        {icon}
      </div>
      <div>
        <p className="text-white text-sm">{message}</p>
        <p className="text-gray-400 text-xs">{time}</p>
      </div>
    </div>
  );
};

export default NotificationItem; 