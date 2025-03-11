import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosConfig";
// Import axios instance

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    skills: "",
    experience: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        "/api/freelancer/signup",
        formData
      );
      console.log("Signup Success:", response.data);

      JSON.stringify(response.data);

      const freelancerId = response.data.userId;
      const freelancerName = response.data.name;

      sessionStorage.setItem("userId", freelancerId);
      sessionStorage.setItem("name", freelancerName);

      // Redirect to dashboard
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">User Signup</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="input rounded-lg input-bordered w-full bg-neutral-800 text-white"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="input rounded-lg input-bordered w-full bg-neutral-800 text-white"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="input rounded-lg input-bordered w-full bg-neutral-800 text-white"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="input rounded-lg input-bordered w-full bg-neutral-800 text-white"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="input rounded-lg input-bordered w-full bg-neutral-800 text-white"
        required
      />

      <input
        type="text"
        name="skills"
        placeholder="Skills (comma-separated)"
        value={formData.skills}
        onChange={handleChange}
        className="input rounded-lg input-bordered w-full bg-neutral-800 text-white"
      />

      <input
        type="text"
        name="experience"
        placeholder="Experience (in years)"
        value={formData.experience}
        onChange={handleChange}
        className="input rounded-lg input-bordered w-full bg-neutral-800 text-white"
      />

      <input
        type="text"
        name="profilePic"
        placeholder="profilePic"
        value={formData.profilePic}
        onChange={handleChange}
        className="input rounded-lg input-bordered w-full bg-neutral-800 text-white"
      />

      <button
        onClick={handleSubmit}
        className="btn btn-primary w-full rounded-lg"
      >
        Sign Up
      </button>
    </form>
  );
};

export default UserSignup;
