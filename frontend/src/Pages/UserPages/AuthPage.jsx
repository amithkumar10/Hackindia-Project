import { useState } from "react";
import UserSignup from "../../Components/UserComps/UserAuth/UserSignup";
import UserLogin from "../../Components/UserComps/UserAuth/UserLogin";

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm px-4">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <span className="text-4xl font-bold px-4 py-2">Mindlancer.ai</span>
        </div>
        <div className="navbar-end"></div>
      </div>

      {/* Auth Form Container */}
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="w-full max-w-md bg-neutral-900 p-8 rounded-lg shadow-lg border border-neutral-700">
          {isLogin ? <UserLogin /> : <UserSignup />}
          
          {/* Toggle Between Login and Signup */}
          <p className="mt-4 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-white hover:underline cursor-pointer"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
