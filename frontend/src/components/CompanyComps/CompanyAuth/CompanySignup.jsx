import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axiosConfig.js"

const CompanySignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    location: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/company/register", formData);
      console.log("Signup Success:", res.data);
      
      // Store company data in session storage
      sessionStorage.setItem("companyData", JSON.stringify(res.data));
      
      // Also store just the ID for easy access
      if (res.data.companyId) {
        sessionStorage.setItem("companyId", res.data.companyId);
      }
      
      navigate("/company/dashboard"); // Redirect on success
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Company Signup</h2>

      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className="w-full p-3 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:border-primary"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:border-primary"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-3 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:border-primary"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-3 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:border-primary"
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-focus transition duration-200"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default CompanySignup;