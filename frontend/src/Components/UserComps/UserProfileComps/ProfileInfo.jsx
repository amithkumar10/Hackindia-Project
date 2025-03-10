import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';

const ProfileInfo = ({ userData, isCurrentUser, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name || '',
    email: userData.email || '',
    phone: userData.phone || '',
    location: userData.location || '',
    skills: userData.skills || [],
    experience: userData.experience || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'skills' ? value.split(',').map(skill => skill.trim()) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      location: userData.location || '',
      skills: userData.skills || [],
      experience: userData.experience || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Profile Information</h2>
        {isCurrentUser && (
          <button 
            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
            className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-black rounded-lg"
          >
            {isEditing ? (
              <><X className="w-4 h-4 mr-1" /> Cancel</>
            ) : (
              <><Edit2 className="w-4 h-4 mr-1" /> Edit Profile</>
            )}
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-zinc-400">Full Name</span>
            </label>
            <div className="input-group">
              <span className="bg-zinc-800 border-r-0 border-zinc-700 px-3 flex items-center">
                <User className="w-4 h-4 text-zinc-400" />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-zinc-400">Email</span>
            </label>
            <div className="input-group">
              <span className="bg-zinc-800 border-r-0 border-zinc-700 px-3 flex items-center">
                <Mail className="w-4 h-4 text-zinc-400" />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-zinc-400">Phone</span>
            </label>
            <div className="input-group">
              <span className="bg-zinc-800 border-r-0 border-zinc-700 px-3 flex items-center">
                <Phone className="w-4 h-4 text-zinc-400" />
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered w-full bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-zinc-400">Location</span>
            </label>
            <div className="input-group">
              <span className="bg-zinc-800 border-r-0 border-zinc-700 px-3 flex items-center">
                <MapPin className="w-4 h-4 text-zinc-400" />
              </span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input input-bordered w-full bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-zinc-400">Skills (comma separated)</span>
            </label>
            <textarea
              name="skills"
              value={formData.skills.join(', ')}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-zinc-800 border-zinc-700 text-white h-20"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-zinc-400">Experience</span>
            </label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-zinc-800 border-zinc-700 text-white h-32"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="btn btn-sm bg-white text-black hover:bg-zinc-200 border-0 rounded-lg"
            >
              <Save className="w-4 h-4 mr-1" /> Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mr-4">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{userData.name}</h3>
              <p className="text-zinc-400">{userData.title || 'Freelancer'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-zinc-400 mr-2" />
              <div>
                <p className="text-sm text-zinc-400">Email</p>
                <p className="text-white">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Phone className="w-5 h-5 text-zinc-400 mr-2" />
              <div>
                <p className="text-sm text-zinc-400">Phone</p>
                <p className="text-white">{userData.phone || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-zinc-400 mr-2" />
              <div>
                <p className="text-sm text-zinc-400">Location</p>
                <p className="text-white">{userData.location || 'Not provided'}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {userData.skills && userData.skills.length > 0 ? (
                userData.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="badge bg-zinc-800 text-white px-3 py-2 rounded-lg border border-zinc-700"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-zinc-400">No skills listed</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-3">Experience</h3>
            <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
              <p className="text-zinc-300 whitespace-pre-line">
                {userData.experience || 'No experience information provided.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo; 