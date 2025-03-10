import { useState } from "react";
import MiniNavbar from "../../Components/Others/MiniNavbar";

// Default placeholder image as a data URI
const defaultProfileImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23333'/%3E%3Ctext x='50' y='50' font-size='20' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' fill='white'%3ELogo%3C/text%3E%3C/svg%3E";

const CompanyProfile = () => {
  const [profile, setProfile] = useState({
    email: "business@example.com",
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    location: "",
    logo: defaultProfileImage,
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Profile data:", profile);
    // You would typically send this data to your backend
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col">
      <MiniNavbar />
      <div className="flex-grow flex justify-center p-6">
        <div className="w-full max-w-3xl p-6">
          
          {/* Header Section with Logo Upload */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="relative group">
              <img
                src={profile.logo}
                alt="Profile"
                className="w-28 h-28 rounded-full border-2 border-gray-400 shadow-xl object-cover bg-gray-700"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white text-xs font-medium">Change Logo</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
              </label>
            </div>
            <div className="md:ml-2">
              <div className="relative">
                <h2 className="text-4xl font-bold tracking-tight text-white">
                  Company Profile
                </h2>
                <div className="h-0.5 w-20 bg-white rounded-full mt-2"></div>
              </div>
              <p className="text-gray-400 mt-3 text-lg font-light">
                Manage your company's presence and information
              </p>
              <p className="text-xs text-gray-500 mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hover over the logo to change it
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Info */}
            <div className="p-7 bg-[#1F1F1F] rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-5">Company Info</h3>
              <div className="space-y-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 font-medium text-base">Company Name</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={profile.companyName}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    className="input w-full bg-[#2C2C2C] text-gray-200 text-base rounded-md"
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 font-medium text-base">Company Description</span>
                  </label>
                  <textarea
                    name="companyDescription"
                    value={profile.companyDescription}
                    onChange={handleChange}
                    placeholder="Describe your company"
                    rows="4"
                    className="textarea w-full bg-[#2C2C2C] text-gray-200 text-base leading-relaxed rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-7 bg-[#1F1F1F] rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-5">Contact Details</h3>
              <div className="space-y-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 font-medium text-base">Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="input w-full bg-[#2C2C2C] text-gray-200 text-base rounded-md"
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 font-medium text-base">Company Website</span>
                  </label>
                  <input
                    type="text"
                    name="companyWebsite"
                    value={profile.companyWebsite}
                    onChange={handleChange}
                    placeholder="https://yourcompany.com"
                    className="input w-full bg-[#2C2C2C] text-gray-200 text-base rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="p-7 bg-[#1F1F1F] rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-5">Company Location</h3>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300 font-medium text-base">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="input w-full bg-[#2C2C2C] text-gray-200 text-base rounded-md"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="btn bg-white text-black hover:bg-gray-200 px-10 py-3 shadow-md text-base font-semibold border-0"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
