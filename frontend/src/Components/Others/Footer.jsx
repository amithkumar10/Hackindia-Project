import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="/" className="text-2xl font-bold">MindLancer</a>
            <p className="text-zinc-400 mt-2">Connect with top freelancers for your projects</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">For Clients</h3>
              <ul className="space-y-2">
                <li><a href="/post-job" className="text-zinc-400 hover:text-white transition">Post a Job</a></li>
                <li><a href="/find-freelancers" className="text-zinc-400 hover:text-white transition">Find Freelancers</a></li>
                <li><a href="/payment-methods" className="text-zinc-400 hover:text-white transition">Payment Methods</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">For Freelancers</h3>
              <ul className="space-y-2">
                <li><a href="/find-jobs" className="text-zinc-400 hover:text-white transition">Find Jobs</a></li>
                <li><a href="/create-profile" className="text-zinc-400 hover:text-white transition">Create Profile</a></li>
                <li><a href="/get-paid" className="text-zinc-400 hover:text-white transition">Get Paid</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/help-support" className="text-zinc-400 hover:text-white transition">Help & Support</a></li>
                <li><a href="/success-stories" className="text-zinc-400 hover:text-white transition">Success Stories</a></li>
                <li><a href="/blog" className="text-zinc-400 hover:text-white transition">Blog</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-400">© {currentYear} MindLancer. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/terms" className="text-zinc-400 hover:text-white transition">Terms</a>
            <a href="/privacy" className="text-zinc-400 hover:text-white transition">Privacy</a>
            <a href="/security" className="text-zinc-400 hover:text-white transition">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 