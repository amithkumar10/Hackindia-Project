import { useState } from "react";
import { Link } from "react-router-dom";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">User Signup</h2>

      <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="input rounded-lg input-bordered w-full bg-neutral-800 text-white" required />

      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input rounded-lg input-bordered w-full bg-neutral-800 text-white" required />

      <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="input rounded-lg input-bordered w-full bg-neutral-800 text-white" required />

      <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="input rounded-lg input-bordered w-full bg-neutral-800 text-white" required />

      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input rounded-lg input-bordered w-full bg-neutral-800 text-white" required />

      <input type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} className="input rounded-lg input-bordered w-full bg-neutral-800 text-white" />

      <input type="text" name="experience" placeholder="Experience (in years)" value={formData.experience} onChange={handleChange} className="input rounded-lg input-bordered w-full bg-neutral-800 text-white" />

      <Link to="/user/dashboard">
      <button type="submit" className="btn btn-primary w-full rounded-lg">Sign Up</button></Link>
      
    </form>
  );
};

export default UserSignup;
