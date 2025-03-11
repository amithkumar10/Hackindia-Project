import React, { useState } from 'react';
import axios from '../../../utils/axiosConfig.js'

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    jobDescription: '',
    skills: [],
    budget: '',
    deadline: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      skills: value.split(',').map((skill) => skill.trim()).filter((skill) => skill),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(''); // Reset previous error message

    try {
      // Get companyId from sessionStorage
      const companyId = sessionStorage.getItem('companyId');
      if (!companyId) {
        throw new Error('Company ID not found in session storage');
      }

      const response = await axios.post(`/api/company/job/${companyId}`, formData);

      if (response.status === 201) {
        setSuccessMessage('Job created successfully!');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      setErrorMessage('Failed to create job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-lg shadow-lg space-y-4 w-full mx-auto border border-neutral-700">
      <div>
        <label htmlFor="title" className="block text-lg font-semibold">
          Job Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Enter job title"
          required
        />
      </div>

      <div>
        <label htmlFor="jobDescription" className="block text-lg font-semibold">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Enter job description"
          required
        />
      </div>

      <div>
        <label htmlFor="skills" className="block text-lg font-semibold">
          Required Skills (Separate by commas)
        </label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={formData.skills.join(', ')}
          onChange={handleSkillsChange}
          className="w-full p-3 mt-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Enter required skills"
          required
        />
      </div>

      <div>
        <label htmlFor="budget" className="block text-lg font-semibold">
          Budget (₹)
        </label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Enter budget"
          inputMode="numeric"
          required
        />
      </div>

      <div>
        <label htmlFor="deadline" className="block text-lg font-semibold">
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 mt-4 bg-primary text-white rounded-lg hover:bg-primary-focus transition duration-200 border border-neutral-700 cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating Job...' : 'Create Job'}
      </button>

      {successMessage && (
        <div className="mt-4 text-center text-green-500 font-semibold">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 text-center text-red-500 font-semibold">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default JobForm;
