import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Menu, X, Search, Star, Clock, Filter } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(true); // Keep dark mode state, but remove toggle UI
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const metricsRef = useRef(null);
  const [metrics, setMetrics] = useState({
    users: 0,
    projects: 0,
    jobs: 0,
    rating: 0
  });

  // Sample job data
  const jobs = [
    { id: 1, title: "AI Model Optimization Engineer", category: "ai", rate: "$80-120/hr", posted: "2 days ago", skills: ["TensorFlow", "PyTorch", "Model Optimization"] },
    { id: 2, title: "ML Pipeline Architect", category: "ai", rate: "$90-150/hr", posted: "1 day ago", skills: ["ML Ops", "Python", "AWS"] },
    { id: 3, title: "Full Stack React Developer", category: "dev", rate: "$60-90/hr", posted: "3 days ago", skills: ["React", "Node.js", "MongoDB"] },
    { id: 4, title: "UI/UX Designer for SaaS Platform", category: "design", rate: "$70-100/hr", posted: "Just now", skills: ["Figma", "UI Design", "User Research"] },
    { id: 5, title: "Data Scientist - Natural Language Processing", category: "ai", rate: "$85-130/hr", posted: "5 days ago", skills: ["NLP", "Python", "BERT"] },
    { id: 6, title: "Blockchain Smart Contract Developer", category: "dev", rate: "$100-150/hr", posted: "2 days ago", skills: ["Solidity", "Web3", "Smart Contracts"] }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah K.",
      role: "AI Engineer",
      quote: "Mindlancer.ai transformed my freelance career. The AI matching system connects me with projects that perfectly align with my expertise, and I've doubled my income in just six months.",
      rating: 5
    },
    {
      name: "Marcus T.",
      role: "Startup Founder",
      quote: "As a founder with limited resources, finding quality talent was always a challenge. Mindlancer.ai's verification system ensures I only work with the best, and the secure payment system gives me peace of mind.",
      rating: 5
    },
    {
      name: "Elena R.",
      role: "Project Manager",
      quote: "The analytics and project management tools on Mindlancer.ai have revolutionized how our team works with freelancers. We can track progress in real-time and ensure deliverables are meeting our standards.",
      rating: 4
    }
  ];

  useEffect(() => {
    // Animate metrics when in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateMetrics();
        }
      },
      { threshold: 0.1 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (metricsRef.current) {
        observer.unobserve(metricsRef.current);
      }
      clearInterval(testimonialInterval);
    };
  }, [testimonials.length]);

  const animateMetrics = () => {
    const finalMetrics = {
      users: 37842,
      projects: 12756,
      jobs: 3589,
      rating: 4.9
    };

    const duration = 2000;
    const startTime = Date.now();

    const updateMetrics = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easeOutQuad = t => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      setMetrics({
        users: Math.floor(easedProgress * finalMetrics.users),
        projects: Math.floor(easedProgress * finalMetrics.projects),
        jobs: Math.floor(easedProgress * finalMetrics.jobs),
        rating: (easedProgress * finalMetrics.rating).toFixed(1)
      });

      if (progress < 1) {
        requestAnimationFrame(updateMetrics);
      }
    };

    requestAnimationFrame(updateMetrics);
  };

  const filteredJobs = jobs.filter(job => 
    (activeTab === 'all' || job.category === activeTab) &&
    (searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 px-4 py-3 ${isDarkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-90'} shadow-md backdrop-blur-sm`}>
        <div className="container mx-auto flex justify-between items-center">
          <a href="#home" className="text-xl font-bold">Mindlancer.ai</a>
          
          {/* Search Bar */}
          <div className={`hidden md:flex items-center px-3 py-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} flex-grow max-w-lg mx-6`}>
            <Search size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
            <input 
              type="text"
              placeholder="Search for jobs, skills, or freelancers..."
              className={`ml-2 w-full bg-transparent focus:outline-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#features" className={`hover:${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors px-3 py-2`}>Features</a>
            <a href="#jobs" className={`hover:${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors px-3 py-2`}>Jobs</a>
            <a href="#testimonials" className={`hover:${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors px-3 py-2`}>Testimonials</a>
            
            <button 
              className={`${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded-full px-4 py-2 hover:opacity-90 transition-colors`}
            >
              Login
            </button>
            
            <button 
              className={`bg-black text-white rounded-full px-4 py-2 hover:opacity-90 transition-colors`}
            >
              Sign Up
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`absolute top-full left-0 w-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg md:hidden`}>
              <div className="flex flex-col p-4 space-y-3">
                <div className={`flex items-center px-3 py-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <Search size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                  <input 
                    type="text"
                    placeholder="Search..."
                    className={`ml-2 w-full bg-transparent focus:outline-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <a href="#features" className={`hover:${isDarkMode ? 'text-gray-300' : 'text-gray-700'} py-2`} onClick={() => setIsMenuOpen(false)}>Features</a>
                <a href="#jobs" className={`hover:${isDarkMode ? 'text-gray-300' : 'text-gray-700'} py-2`} onClick={() => setIsMenuOpen(false)}>Jobs</a>
                <a href="#testimonials" className={`hover:${isDarkMode ? 'text-gray-300' : 'text-gray-700'} py-2`} onClick={() => setIsMenuOpen(false)}>Testimonials</a>
                <button 
                  className={`${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded-full px-4 py-2 hover:opacity-90 transition-colors`}
                >
                  Login
                </button>
                <button 
                  className="bg-black text-white rounded-full px-4 py-2 hover:opacity-90 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Mindlancer.ai</h1>
            <p className="text-lg mb-8">The AI-powered freelancer marketplace connecting visionary minds with groundbreaking projects.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className={`${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded-full px-6 py-3 font-medium hover:opacity-90 transition-colors`}>
                Get Started
              </button>
              <button className={`border ${isDarkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'} rounded-full px-6 py-3 font-medium transition-colors`}>
                Learn More
              </button>
            </div>
          </div>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto" ref={metricsRef}>
            <div className="text-center">
              <p className="text-3xl font-bold">{metrics.users.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{metrics.projects.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Projects Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{metrics.jobs.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Open Jobs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{metrics.rating}</p>
              <p className="text-sm text-gray-400">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gradient-to-b from-transparent to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Matching System</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our proprietary algorithm matches your skills and preferences with perfect projects.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Funds are secured until you're satisfied with the work, protecting both parties.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Skill Verification</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                All professionals are vetted through our rigorous skill verification process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section id="jobs" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Featured Opportunities</h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full ${activeTab === 'all' 
                ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white') 
                : (isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-black hover:bg-gray-300')} transition-colors`}
            >
              All Jobs
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`px-4 py-2 rounded-full ${activeTab === 'ai' 
                ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white') 
                : (isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-black hover:bg-gray-300')} transition-colors`}
            >
              AI/ML
            </button>
            <button 
              onClick={() => setActiveTab('dev')}
              className={`px-4 py-2 rounded-full ${activeTab === 'dev' 
                ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white') 
                : (isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-black hover:bg-gray-300')} transition-colors`}
            >
              Development
            </button>
            <button 
              onClick={() => setActiveTab('design')}
              className={`px-4 py-2 rounded-full ${activeTab === 'design' 
                ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white') 
                : (isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-black hover:bg-gray-300')} transition-colors`}
            >
              Design
            </button>
          </div>
          
          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredJobs.map(job => (
              <div 
                key={job.id} 
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md transition-all hover:shadow-lg`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold">{job.title}</h3>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{job.rate}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Clock size={14} className="mr-1" /> {job.posted}
                  </span>
                  <button className="text-sm px-3 py-1 rounded-full bg-black text-white">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No jobs found matching your search criteria.
            </div>
          )}
          
          {/* View More Button */}
          <div className="mt-8 text-center">
            <button className={`${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded-full px-6 py-3 font-medium hover:opacity-90 transition-colors`}>
              View All Opportunities
            </button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gradient-to-b from-gray-800 to-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12 text-center">Success Stories</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-md`}>
              <p className={`text-lg mb-6 italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                "{testimonials[currentTestimonial].quote}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src="/api/placeholder/80/80" 
                    alt={testimonials[currentTestimonial].name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{testimonials[currentTestimonial].name}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < testimonials[currentTestimonial].rating ? "currentColor" : "none"}
                      className={i < testimonials[currentTestimonial].rating 
                        ? "text-yellow-400"
                        : (isDarkMode ? "text-gray-600" : "text-gray-300")}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Testimonial Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentTestimonial === idx 
                    ? 'bg-black' 
                    : (isDarkMode ? 'bg-gray-600' : 'bg-gray-300')}`}
                  aria-label={`View testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="mb-8 max-w-2xl mx-auto">Join thousands of freelancers and clients already using Mindlancer.ai to connect, collaborate, and create breakthrough projects.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className={`${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded-full px-6 py-3 font-medium hover:opacity-90 transition-colors`}>
                Join as Freelancer
              </button>
              <button className="bg-black text-white rounded-full px-6 py-3 font-medium hover:opacity-90 transition-colors">
                Join as Client
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Mindlancer.ai</h3>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#about" className="hover:underline">About Us</a></li>
                <li><a href="#careers" className="hover:underline">Careers</a></li>
                <li><a href="#press" className="hover:underline">Press</a></li>
                <li><a href="#contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">For Freelancers</h3>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#find-work" className="hover:underline">Find Work</a></li>
                <li><a href="#create-profile" className="hover:underline">Create Profile</a></li>
                <li><a href="#resources" className="hover:underline">Resources</a></li>
                <li><a href="#community" className="hover:underline">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">For Clients</h3>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#post-job" className="hover:underline">Post a Job</a></li>
                <li><a href="#find-talent" className="hover:underline">Find Talent</a></li>
                <li><a href="#enterprise" className="hover:underline">Enterprise</a></li>
                <li><a href="#success-stories" className="hover:underline">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:underline">Terms of Service</a></li>
                <li><a href="#cookies" className="hover:underline">Cookie Policy</a></li>
                <li><a href="#security" className="hover:underline">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className={`mb-4 md:mb-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 Mindlancer.ai. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#twitter" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                Twitter
              </a>
              <a href="#linkedin" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                LinkedIn
              </a>
              <a href="#instagram" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;