import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
const MiniNavbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Left section with home button */}
      <div className="navbar-start">
        <Link to="/company/dashboard" className="btn btn-ghost btn-circle">
          <Home className="w-6 h-6" />
        </Link>
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
