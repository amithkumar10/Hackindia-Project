import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { LucideArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-base-200 text-white font-sans overflow-hidden">
      {/* Spline Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Spline scene="https://prod.spline.design/wsDljL23dphkobHY/scene.splinecode" />
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-primary text-white shadow-lg transition-opacity duration-300 opacity-100"
        >
          <LucideArrowUp size={24} />
        </button>
      )}

      {/* Login Buttons - Positioned at the Bottom */}
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex gap-6">
        <button 
          className="px-6 py-3 bg-primary text-white rounded-lg shadow-lg text-lg font-semibold hover:bg-primary-dark transition-all"
          onClick={() => navigate("/company/")}
        >
          Business Login
        </button>
        <button 
          className="px-6 py-3 bg-secondary text-white rounded-lg shadow-lg text-lg font-semibold hover:bg-secondary-dark transition-all"
          onClick={() => navigate("/user/auth")}
        >
          Freelancer Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
