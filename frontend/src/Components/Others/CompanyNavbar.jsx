import { User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu className="w-6 h-6" />
          </div>
          <ul 
            tabIndex={0} 
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/company/dashboard">Dashboard</Link></li>
            <li><Link to="/company/jobpostings">Job Postings</Link></li>
            <li><Link >Conversations</Link></li>
          </ul>
        </div>
        <span className="text-4xl font-bold px-4 py-2">Mindlancer.ai</span>
      </div>

      {/* ✅ Fixed Tabs with Routing */}
      <div className="navbar-center hidden lg:flex">
        <div role="tablist" className="tabs tabs-lg tabs-bordered">
          <Link to="/company/dashboard">
            <button role="tab" className="tab transition-all duration-300">
              Dashboard
            </button>
          </Link>
          <Link to="/company/jobpostings">
            <button role="tab" className="tab transition-all duration-300">
              Jobs
            </button>
          </Link>
          <Link>
            <button role="tab" className="tab transition-all duration-300">
              Conversations
            </button>
          </Link>
        </div>
      </div>

      <div className="navbar-end flex items-center gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <User className="w-8 h-6 text-gray-500 mt-1" />
          </label>
          <ul 
            tabIndex={0} 
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/company/profile">Profile</Link></li>
            <li><button>Settings</button></li>
            <li><button>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
