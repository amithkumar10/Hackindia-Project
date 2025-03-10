import {JobApplication} from "../../models/JobApplicationModel.js";
import {Company} from "../../models/CompanyModel.js";
import {JobPosting} from "../../models/JobPostingModel.js";
import {Freelancer} from "../../models/FreelancerModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";





export const companyRegister=async(req,res)=>{
    try{
        const {email,password,companyName,location}=req.body;
        console.log(req.body);

        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
        return res.status(400).json({ message: "Company already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        if(!hashPassword){
            return res.status(400).json({ message: "Password hashing failed" });
        }

        const newCompany = await Company.create({
            email,
            password:hashPassword,
            companyName,
            location,

        });
        if(!newCompany){
            return res.status(400).json({ message: "Company registration failed" });
        }

        return res.status(201).json({ message: "Company registered successfully", company: newCompany });

    }catch{
        console.error("Error registering company:", error);
        return res.status(500).json({ message: "Internal server error" });

    }

}

export const companyLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        

        const existingCompany = await Company.findOne({ email });
        if(!existingCompany){
            return res.status(400).json({ message: "Company does not exist" });
        }
        console.log(existingCompany);

        const isPasswordValid = await bcrypt.compare(password, existingCompany.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid password" });
        }  

      

        return res.status(200).json({ message: "Login successful", companyName: existingCompany.companyName, companyId: existingCompany._id });
    }
    catch(error){
        console.error("Error logging in company:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getProfile=async(req,res)=>{
    try{
        
        const {companyId} = req.params;
        if(!companyId){
            return res.status(400).json({ message: "Company not logged in" });
        }
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(400).json({ message: "Company does not exist" });
        }
        return res.status(200).json({ message: "Company profile", company });
    }
    catch(error){
        console.error("Error getting company profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfile=async(req,res)=>{
    try{
        const {companyId} = req.params;
        if(!companyId){
            return res.status(400).json({ message: "Company not logged in" });
        }
        const updateFields = req.body;
        const updatedCompany = await Company.findByIdAndUpdate(companyId, { $set: updateFields }, { new: true }).select("-password");
    
        if(!updatedCompany){
            return res.status(400).json({ message: "Company update failed" });
        }
        return res.status(200).json({ message: "Company updated successfully", company: updatedCompany });

    }
    catch(error){
        console.error("Error updating company profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}




//all the applicants who have applied for the job posting 

export const addJob=async(req,res)=>{

    try{
        const {companyId} = req.params;
        if(!companyId){
            return res.status(400).json({ message: "Company not logged in" });
        }
        const {title,jobDescription,skills,budget} = req.body;
        const newJob = await JobPosting.create({
            companyId,
            title,
            jobDescription,
            skills,
            budget
        });
        if(!newJob){
            return res.status(400).json({ message: "Job posting failed" });
        }
        return res.status(201).json({ message: "Job posted successfully", job: newJob });

    }
    catch(error){
        console.error("Error posting job:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

} 


//optional if you want to show all his jobs postings
export const getAllJobs = async (req, res) => {
    try {
      const { companyId } = req.params;
      if (!companyId) {
        return res.status(400).json({ message: "Company not logged in" });
      }
      // Find all jobs posted by the company
      const jobs = await JobPosting.find({ companyId });
      return res.status(200).json({ message: "All jobs", jobs });
    } catch (error) {
      console.error("Error getting all jobs:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
}
export const getJobById = async (req, res) => {
    try{
        const { jobId } = req.params;
        if (!jobId) {
            return res.status(400).json({ message: "Job ID not provided" });
        }
        const job = await JobPosting.findById(jobId);
        if (!job) {
            return res.status(400).json({ message: "Job does not exist" });
        }
        return res.status(200).json({ message: "Job details", job });
    }catch{
        console.error("Error getting job details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//get all the applicants who have applied for the job posting
export const getJobApplicants = async (req, res) => {
    try {
      const { jobId } = req.params;
      if (!jobId) {
        return res.status(400).json({ message: "job ID not provided" });
      }
      const job = await JobPosting.findById(jobId).populate("applications");
      if (!job) {
        return res.status(400).json({ message: "Job does not exist" });
      }
      return res.status(200).json({ message: "Job applicants", applicants: job.applications });
    } catch (error) {
      console.error("Error getting job applicants:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
}

//to shortlist an applicant 
export const shortlistApplicant = async (req, res) => {
    try{

        const { jobId } = req.params;
        const { freelancerId } = req.body;

        if (!jobId || !freelancerId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Update the application status to "shortlisted"
        const application = await JobApplication.findOneAndUpdate(
            { jobId, freelancerId },
            { applicationStatus: "shortlisted" },
            { new: true }
        );

        if (!application) {
            return res.status(400).json({ message: "Application not found or update failed" });
        }

        return res.status(200).json({ message: "Applicant shortlisted successfully", application });


    }catch{
        console.error("Error shortlisting applicant:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
}

//get all shortlisted applicants
export const getShortlistedApplicants = async (req, res) => {
    try{
        const { jobId } = req.params;
        if (!jobId) {
            return res.status(400).json({ message: "job ID not provided" });
        }
        const job = await JobPosting.findById(jobId).populate("applications");
        if (!job) {
            return res.status(400).json({ message: "Job does not exist" });
        }
        const shortlistedApplicants = job.applications.filter(app => app.applicationStatus === "shortlisted");
        return res.status(200).json({ message: "Shortlisted applicants", applicants: shortlistedApplicants });

    }catch{
        console.error("Error getting shortlisted applicants:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
    

//this is to be used when we will hire the applicant 
export const acceptApplicant = async (req, res) => {
    try {
        const { companyId, jobId } = req.params;
        const { freelancerId,message} = req.body;

        const freelancer = await Freelancer.findById(freelancerId);
        if (!freelancer || !freelancer.email) {
            return res.status(400).json({ message: "Freelancer not found or missing email" });
        }

        const job = await JobPosting.findById(jobId);
        if (!job) {
            return res.status(400).json({ message: "Job not found" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: "premshetgaonkar93@gmail.com",//change it later freelancer.email
            subject: `Job Application Accepted for ${job.title}`,
            html: `
                <h2>Congratulations!</h2>
                <p>Your application for the job <strong>${job.title}</strong> has been accepted.</p>
                <p><strong>Message from employer:</strong> ${message}</p>
                <p>Best Regards,</p>
                <p>The Hiring Team</p>
            `,
        };


        const emailSent = await transporter.sendMail(mailOptions);
        console.log("Email sent:", emailSent.response);

        if (!emailSent) {
            return res.status(400).json({ message: "Email sending failed" });
        }

        if (!companyId || !jobId || !freelancerId||!message) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Update the application status to "accepted"
        const application = await JobApplication.findOneAndUpdate(
            { jobId, freelancerId }, // Find application by job and freelancer
            { applicationStatus: "accepted" }, // Update status
            { new: true }
        );

        if (!application) {
            return res.status(400).json({ message: "Application not found or update failed" });
        }

        // Update the job status to "closed"
        const updateJob = await JobPosting.findByIdAndUpdate(
            jobId,
            { status: "closed" },
            { new: true }
        );

        if (!updateJob) {
            return res.status(400).json({ message: "Job not found or update failed" });
        }

        // Add the job to the company's activeJobs array
        const updatedCompany = await Company.findByIdAndUpdate(
            companyId,
            {
                $addToSet: {
                    activeJobs: {
                        jobId: job._id,
                        jobTitle: job.title,
                        jobDescription: job.jobDescription,
                        freelancerId: freelancerId,
                        status: "ongoing",
                        startDate: Date.now(),
                    },
                },
            },
            { new: true }
        ).select("-password");

        

        if (!updatedCompany) {
            return res.status(400).json({ message: "Setting ongoing project failed" });
        }

        return res.status(200).json({
            message: "Applicant accepted and job set as ongoing",
            company: updatedCompany,
        });

    } catch (error) {
        console.error("Error accepting applicant:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const rejectApplicant = async (req, res) => {
    try {
      const { jobId } = req.params;
      const{freelancerId}=req.body;
      
  
      if (!jobId || !freelancerId) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const application = await JobApplication.findOneAndUpdate(
        { jobId, freelancerId },
        { applicationStatus: "rejected" },
        { new: true }
      );
  
      if (!application) {
        return res.status(400).json({ message: "Application not found or update failed" });
      }
  
      return res.status(200).json({ message: "Applicant rejected successfully", application });
    } catch (error) {
      console.error("Error rejecting applicant:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
};




export const getActiveJobs = async (req, res) => {
    try {
      const { companyId } = req.params;
      if (!companyId) {
        return res.status(400).json({ message: "Company not logged in" });
      }
      // Populate the jobId field in activeJobs to get full job details
      const company = await Company.findById(companyId).populate("activeJobs.jobId");
      if (!company) {
        return res.status(400).json({ message: "Company does not exist" });
      }
      const ongoingProjects = company.activeJobs.filter(job => job.status === "ongoing");
      return res.status(200).json({ message: "Ongoing projects", ongoingProjects });
    } catch (error) {
      console.error("Error getting ongoing projects:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
}



//this is for updating the status of the ongoing-project
// status can be "ongoing", "completed", or "cancelled"


export const updateActiveJobStatus = async (req, res) => {
    try {
        const { companyId, jobId } = req.params;
        if (!companyId) {
            return res.status(400).json({ message: "Company not logged in" });
        }

        const { status } = req.body; // status can be "ongoing", "completed", or "cancelled"

        const updatedProject = await Company.findOneAndUpdate(
            { _id: companyId, "activeJobs.jobId": jobId }, // Find company and job inside array
            { $set: { "activeJobs.$.status": status } }, // Update the matched job's status
            { new: true } // Return updated document
        );

        if (!updatedProject) {
            return res.status(400).json({ message: "Project update failed" });
        }

        return res.status(200).json({ message: "Project updated successfully", project: updatedProject });

    } catch (error) {
        console.error("Error updating project status:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getProjectDetails = async (req, res) => {
    try {
      const { jobId } = req.params;
      if (!jobId) {
        return res.status(400).json({ message: "job ID not provided" });
      }
      const project = await JobPosting.findById(jobId);
      if (!project) {
        return res.status(400).json({ message: "Job does not exist" });
      }
      return res.status(200).json({ message: "job details", project });
    } catch (error) {
      console.error("Error getting job details:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
}




  




// export const getOngoingProjects=async(req,res)=>{
//     try{
//         const {companyId} = req.params;
//         if(!companyId){
//             return res.status(400).json({ message: "Company not logged in" });
//         }
//         const company = await Company.findById(companyId).populate("activeJobs.jobId");
//         if(!company){
//             return res.status(400).json({ message: "Company does not exist" });
//         }
//         const ongoingProjects = company.activeJobs.filter(job => job.status === "ongoing");
//         return res.status(200).json({ message: "Ongoing projects", ongoingProjects });
//     }
//     catch(error){
//         console.error("Error getting ongoing projects:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
    
// }