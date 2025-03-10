import { useState, useEffect } from "react";
import MiniNavbar from "../../components/Others/CompanyMiniNavbar";

const mockProfileData = {
  email: "business@example.com",
  companyName: "Tech Solutions Ltd.",
  companyDescription: "We provide cutting-edge tech solutions to businesses.",
  companyWebsite: "https://techsolutions.com",
  location: "Mumbai, India",
  logo: "https://via.placeholder.com/100", // Placeholder logo
};

const CompanyProfile = () => {
  const [profile, setProfile] = useState(mockProfileData);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Simulating fetch call (Replace this with an actual API call)
    setProfile(mockProfileData);
  }, []);

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
            <p className="text-gray-400">{profile.email}</p>

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

          {/* Edit Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setEditMode(!editMode)}
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