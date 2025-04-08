import React from "react";

const AppliedJobCard = ({
  title,
  jobDescription,
  budget,
  bidAmount,
  applicationStatus,
}) => {
  return (
    <div className="bg-[#1e1e2f] text-white p-5 rounded-xl shadow-md transition hover:scale-[1.02] duration-300 border border-gray-700">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-300 mb-4">{jobDescription}</p>

      <div className="text-sm mb-2">
        <span className="font-medium text-gray-400">Budget:</span> ₹{budget}
      </div>

      <div className="text-sm mb-2">
        <span className="font-medium text-gray-400">Your Bid:</span> ₹
        {bidAmount}
      </div>

      <div
        className={`text-sm mt-3 font-semibold 
        ${
          applicationStatus === "accepted"
            ? "text-green-400"
            : applicationStatus === "rejected"
            ? "text-red-400"
            : "text-yellow-400"
        }`}
      >
        Status: {applicationStatus}
      </div>
    </div>
  );
};

export default AppliedJobCard;
