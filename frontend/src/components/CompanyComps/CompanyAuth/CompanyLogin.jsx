import { useState } from "react";
import { Link } from "react-router-dom";
const CompanyLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Company Login</h2>

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
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-3 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:border-primary"
        required
      />

      <Link to="/company/dashboard"><button
        type="submit"
        className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-focus transition duration-200"
      >
        Log In
      </button></Link>
    </form>
  );
};

export default CompanyLogin;
