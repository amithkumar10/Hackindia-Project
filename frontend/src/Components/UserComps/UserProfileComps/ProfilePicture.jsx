import React, { useState } from 'react';
import { Camera, User } from 'lucide-react';

const ProfilePicture = ({ profilePic, isCurrentUser, onUpdateProfilePic }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleUpdateClick = () => {
    setIsUpdating(true);
    setImageUrl(profilePic || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfilePic(imageUrl);
    setIsUpdating(false);
  };

  const handleCancel = () => {
    setIsUpdating(false);
  };

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full bg-zinc-800 border-4 border-zinc-700 overflow-hidden">
            {profilePic ? (
              <img 
                src={profilePic} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-16 h-16 text-zinc-600" />
              </div>
            )}
          </div>
          
          {isCurrentUser && !isUpdating && (
            <button 
              onClick={handleUpdateClick}
              className="absolute bottom-0 right-0 btn btn-circle btn-sm bg-white text-black hover:bg-zinc-200 border-0"
            >
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>

        {isUpdating && (
          <form onSubmit={handleSubmit} className="w-full max-w-xs mt-2">
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text text-zinc-400">Image URL</span>
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="input input-bordered w-full bg-zinc-800 border-zinc-700 text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-sm btn-outline border-zinc-600 text-zinc-300 hover:bg-zinc-700 hover:border-zinc-500 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-sm bg-white text-black hover:bg-zinc-200 border-0 rounded-lg"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture; 