import React from "react";

const AppliedJobCard = ({
  title,
  jobDescription,
  budget,
  bidAmount,
  applicationStatus,
}) => {
  const statusStyles = {
    accepted: "bg-green-800/30 text-green-300 border border-green-500",
    rejected: "bg-red-800/30 text-red-300 border border-red-500",
    pending: "bg-yellow-800/30 text-yellow-300 border border-yellow-500",
  };

  return (
    <div className="bg-[#12121a] hover:bg-[#1a1a2b] transition-colors duration-300 text-white p-6 rounded-3xl shadow-[0_0_15px_#00000033] border border-gray-700/40 backdrop-blur-md hover:scale-[1.02] transform transition-transform duration-300 group">
      <h2 className="text-2xl font-extrabold mb-2 group-hover:text-purple-300 transition-colors duration-300">
        {title}
      </h2>

      <p className="text-sm text-gray-400 mb-5 leading-relaxed">
        {jobDescription}
      </p>

      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <div className="text-gray-400 font-medium">Budget:</div>
        <div className="text-white font-semibold">₹{budget}</div>

        <div className="text-gray-400 font-medium">Your Bid:</div>
        <div className="text-white font-semibold">₹{bidAmount}</div>
      </div>

      <div
        className={`mt-5 inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-inner backdrop-blur-sm transition-all duration-300 animate-fade-in ${
          statusStyles[applicationStatus] || "bg-gray-700 text-white"
        }`}
      >
        {applicationStatus}
      </div>
    </div>
  );
};

export default AppliedJobCard;
