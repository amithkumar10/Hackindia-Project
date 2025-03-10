import React from 'react';
import MiniNavbar from '../../components/Others/CompanyMiniNavbar';
import JobForm from '../../components/CompanyComps/CreateJobPage/JobForm';

const CreateJobPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-start p-6">
      {/* Mini Navbar */}
      <MiniNavbar />

      {/* Job Form */}
      <div className="w-full max-w-3xl mt-4">
        <h1 className="mt-4 text-3xl text-white font-bold text-center mb-6">Create a New Job</h1>
        <JobForm />
      </div>
    </div>
  );
};

export default CreateJobPage;
