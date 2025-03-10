import React from 'react';

const StatCard = ({ title, value, subtitle, icon, isRupee = false }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-gray-400 text-lg">{title}</div>
          <div className="text-white text-3xl font-bold mt-2">
            {isRupee ? `₹${typeof value === 'number' ? value.toLocaleString('en-IN') : value}` : value}
          </div>
          <div className="text-gray-400 text-sm mt-1">{subtitle}</div>
        </div>
        <div className="text-white opacity-70">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard; 