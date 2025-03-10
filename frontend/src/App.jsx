import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicantsPage from './pages/CompanyPages/ApplicantsPage'
import CompanyAuthPage from './pages/CompanyPages/CompanyAuthPage'
import CreateJobPage from './pages/CompanyPages/CreateJobPage'
import JobPostingsPage from './pages/CompanyPages/JobPostingsPage'
import CompanyDashboard from './pages/CompanyPages/CompanyDashboard'
import CompanyProfilePage from './pages/CompanyPages/CompanyProfile'
import LandingPage from './pages/Others/LandingPage';
import MessagePage from './pages/CompanyPages/MessagePage';

function App() {
  return (
    <>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/auth" element={<CompanyAuthPage />} />
        <Route path="/company/applicants" element={<ApplicantsPage />} />
        <Route path="/company/profile" element={<CompanyProfilePage />} />
        <Route path="/company/createjob" element={<CreateJobPage />} />
        <Route path="/company/jobpostings" element={<JobPostingsPage />} />
        <Route path="/company/conversations" element={<MessagePage />} />
      </Routes>
    </>
  )
}

export default App  