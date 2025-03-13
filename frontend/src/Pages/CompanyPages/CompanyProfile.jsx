import { useState, useEffect } from "react";
import MiniNavbar from "../../components/Others/CompanyMiniNavbar";
import  axiosInstance from "../../utils/axiosConfig.js"

const CompanyProfile = () => {
  const [profile, setProfile] = useState({
    email: "",
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    location: "",
    logo: "https://via.placeholder.com/100", // Default placeholder
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const companyId=sessionStorage.getItem("companyId");

  // Fetch profile data from backend on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`/api/company/profile/${companyId}`);
        const companyData = response.data.company; // Extract the 'company' object
        setProfile(
         companyData
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [companyId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, logo: reader.result }); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes to backend
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!response.ok) throw new Error("Failed to save profile");
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setEditMode(false); // Exit edit mode on success
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col">
      <MiniNavbar />
      <div className="flex-grow flex justify-center p-6">
        <div className="w-full max-w-3xl p-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="relative group">
              <img
                src={profile.logo}
                alt="Profile"
                className="w-28 h-28 rounded-full border-2 border-gray-400 shadow-xl object-cover bg-gray-700"
              />
              {editMode && (
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white text-xs font-medium">Change Logo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                </label>
              )}
            </div>
            <div className="md:ml-2">
              <h2 className="text-4xl font-bold tracking-tight text-white">Company Profile</h2>
              <div className="h-0.5 w-20 bg-white rounded-full mt-2"></div>
              <p className="text-gray-400 mt-3 text-lg font-light">Manage your company's information</p>
            </div>
          </div>

          {/* Company Info */}
          <div className="p-7 bg-[#1F1F1F] rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-5">Company Info</h3>
            <p className="text-gray-300 text-base font-medium">Company Name:</p>
            {editMode ? (
              <input
                type="text"
                name="companyName"
                value={profile.companyName}
                onChange={handleChange}
                className="input w-full bg-[#2C2C2C] text-gray-200 text-base rounded-md mt-1"
              />
            ) : (
              <p className="text-gray-400">{profile.companyName}</p>
            )}

            <p className="text-gray-300 text-base font-medium mt-4">Company Description:</p>
            {editMode ? (
              <textarea
                name="companyDescription"
                value={profile.companyDescription}
                onChange={handleChange}
                rows="4"
                className="textarea w-full bg-[#2C2C2C] text-gray-200 text-base leading-relaxed rounded-md mt-1"
              />
            ) : (
              <p className="text-gray-400">{profile.companyDescription}</p>
            )}
          </div>

          {/* Contact Details */}
          <div className="p-7 bg-[#1F1F1F] rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold mb-5">Contact Details</h3>
            <p className="text-gray-300 text-base font-medium">Email Address:</p>
            <p className="text-gray-400">{profile.email}</p> {/* Email not editable for simplicity */}

            <p className="text-gray-300 text-base font-medium mt-4">Company Website:</p>
            {editMode ? (
              <input
                type="text"
                name="companyWebsite"
                value={profile.companyWebsite}
                onChange={handleChange}
                className="input w-full bg-[#2C2C2C] text-gray-200 text-base rounded-md mt-1"
              />
            ) : (
              <p className="text-gray-400">{profile.companyWebsite}</p>
            )}
          </div>

          {/* Location */}
          <div className="p-7 bg-[#1F1F1F] rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold mb-5">Company Location</h3>
            {editMode ? (
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="input w-full bg-[#2C2C2C] text-gray-200 text-base rounded-md"
              />
            ) : (
              <p className="text-gray-400">{profile.location}</p>
            )}
          </div>

          {/* Edit/Save Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={editMode ? handleSave : () => setEditMode(true)}
              className="btn bg-white text-black hover:bg-gray-200 px-10 py-3 shadow-md text-base font-semibold border-0"
            >
              {editMode ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;