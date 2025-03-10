import { Home } from 'lucide-react';

const MiniNavbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Left section with home button */}
      <div className="navbar-start">
        <div className="btn btn-ghost btn-circle">
          <Home className="w-6 h-6" />
        </div>
      </div>

      {/* Center section with brand name */}
      <div className="navbar-center">
        <span className="text-4xl font-bold px-4 py-2">Mindlancer.ai</span>
      </div>

      {/* Right section - empty after removing profile icon */}
      <div className="navbar-end">
        {/* Profile icon removed */}
      </div>
    </div>
  );
};

export default MiniNavbar;
