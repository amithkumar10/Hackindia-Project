import { useState } from "react";
import CompanySignup from "../../components/CompanyComps/CompanyAuth/CompanySignup";
import CompanyLogin from "../../components/CompanyComps/CompanyAuth/CompanyLogin";
import MiniNavbar from "../../components/Others/MiniNavbar";

const CompanyAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white">
     <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Left section with home button */}
      <div className="navbar-start">
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

      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="w-full max-w-md bg-neutral-900 p-8 rounded-lg shadow-lg border border-neutral-700">
          {isLogin ? <CompanyLogin /> : <CompanySignup />}
          <p className="mt-4 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-white
               underline cursor-pointer"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyAuth;
