import React from 'react';

const QuickActionCard = ({ icon, title, description }) => {
  return (
    <div className="bg-zinc-800 hover:bg-zinc-700 transition-colors p-6 rounded-lg text-center cursor-pointer block">
      <div className="bg-zinc-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-white text-lg font-medium">{title}</h3>
      <p className="text-gray-400 text-sm mt-2">{description}</p>
    </div>
  );
};

export default QuickActionCard;
