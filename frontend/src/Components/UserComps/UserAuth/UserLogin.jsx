import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosConfig.js";
import { useNavigate } from "react-router-dom";
const UserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/api/freelancer/login",
        formData
      );
      console.log("Login Success:", response.data);

      JSON.stringify(response.data);

      const userId = response.data.userId;
      const userName = response.data.name;

      console.log("About to store freelancerId:", userId);
      console.log("About to store name:", userName);

      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("name", userName);

      // Redirect to dashboard
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
    }
  };

  return (
    <form className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">User Login</h2>

      {/* Email Field */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="input input-bordered w-full bg-neutral-800 text-white rounded-lg"
        required
      />

      {/* Password Field */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="input input-bordered w-full bg-neutral-800 text-white rounded-lg"
        required
      />

      {/* Submit Button */}

      <button
        onClick={handleSubmit}
        className="btn btn-primary w-full rounded-lg"
      >
        Log In
      </button>
    </form>
  );
};

export default UserLogin;
