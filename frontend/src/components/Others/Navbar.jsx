import { Link, useLocation } from 'react-router-dom';
import { User, Menu } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

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
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/jobs">Job Postings</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/conversations">Conversations</Link></li>
          </ul>
        </div>
        <Link to="/" className="text-4xl font-bold px-4 py-2">Mindlancer.ai</Link>
      </div>

      {/* ✅ Fixed Tabs with Proper Animation */}
      <div className="navbar-center hidden lg:flex">
        <div role="tablist" className="tabs tabs-lg tabs-bordered">
          {["dashboard", "jobs", "projects", "conversations"].map((tab) => (
            <Link 
              key={tab}
              to={`/${tab}`}
              role="tab"
              className={`tab transition-all duration-300 ${
                location.pathname === `/${tab}` ? "tab-active border-b-2 border-primary" : ""
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Link>
          ))}
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
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;