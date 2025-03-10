import { User, Menu, Briefcase, MessageSquare, Home } from "lucide-react";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Navbar Start - Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu className="w-6 h-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/user/dashboard"><Home className="w-4 h-4" /> Dashboard</Link></li>
            <li><Link to="/user/profile"><User className="w-4 h-4" /> Profile</Link></li>
            <li><Link to="/user/jobsearch"><Briefcase className="w-4 h-4" /> Job Search</Link></li>
            <li><Link ><MessageSquare className="w-4 h-4" /> Conversations</Link></li>
          </ul>
        </div>
        <span className="text-4xl font-bold px-4 py-2">Mindlancer.ai</span>
      </div>

      {/* Center Navigation for Large Screens */}
      <div className="navbar-center hidden lg:flex">
        <div role="tablist" className="tabs tabs-lg tabs-bordered">
          <Link to="/user/dashboard">
            <button role="tab" className="tab transition-all duration-300">
              Dashboard
            </button>
          </Link>
          <Link to="/user/profile">
            <button role="tab" className="tab transition-all duration-300">
              Profile
            </button>
          </Link>
          <Link to="/user/jobsearch">
            <button role="tab" className="tab transition-all duration-300">
              Job Search
            </button>
          </Link>
          <Link >
            <button role="tab" className="tab transition-all duration-300">
              Chat
            </button>
          </Link>
        </div>
      </div>

      {/* Profile Dropdown on Right */}
      <div className="navbar-end flex items-center gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <User className="w-8 h-6 text-gray-500 mt-1" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/user/profile">Profile</Link></li>
            <li><button>Settings</button></li>
            <li><button>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
