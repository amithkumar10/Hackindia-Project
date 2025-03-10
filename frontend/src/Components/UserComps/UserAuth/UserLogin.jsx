import { useState } from "react";
import { Link } from "react-router-dom";
const UserLogin = () => {
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
      <Link to="/user/dashboard">
      <button type="submit" className="btn btn-primary w-full rounded-lg">
        Log In
      </button></Link>

    </form>
  );
};

export default UserLogin;
