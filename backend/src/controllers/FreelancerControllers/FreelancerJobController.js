import { JobPosting } from "../../models/JobPostingModel.js";
import { JobApplication } from "../../models/JobApplicationModel.js";
import { Company } from "../../models/CompanyModel.js";
import { Freelancer } from "../../models/FreelancerModel.js";
import mongoose from "mongoose";

//GET ALL JOBS (FILTER IT IN FRONTEND)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobPosting.find()
      .select("title jobDescription skills budget status")
      .populate({
        path: "companyId",
        select: "companyName",
      });

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//GET MATCHING JOBS
export const getMatchingJobs = async (req, res) => {
  try {
    const { freelancerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(freelancerId)) {
      return res.status(400).json({ message: "Invalid Freelancer ID" });
    }

    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    const freelancerSkills = freelancer.skills;

    const matchingJobs = await JobPosting.find({
      skills: { $in: freelancerSkills },
    });

    res.status(200).json({
      message: "Matching job postings found",
      jobs: matchingJobs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//APPLY FOR JOB
export const applyForJob = async (req, res) => {
  try {
    const { jobId, freelancerId, bidAmount } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(jobId) ||
      !mongoose.Types.ObjectId.isValid(freelancerId)
    ) {
      return res.status(400).json({ message: "Invalid job or freelancer ID" });
    }

    const job = await JobPosting.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job posting not found" });
    }

    if (job.status !== "open") {
      return res.status(400).json({ message: "Job posting is no longer open" });
    }

    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    const existingApplication = await JobApplication.findOne({
      jobId,
      freelancerId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    const newApplication = new JobApplication({
      jobId,
      freelancerId,
      bidAmount: bidAmount || 0,
      applicationStatus: "pending",
    });

    await newApplication.save();

    job.applications.push(newApplication._id);
    await job.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//GET FREELANCER APPLICATIONS
export const getFreelancerApplications = async (req, res) => {
  try {
    const { freelancerId } = req.params;

    if (!freelancerId) {
      return res.status(400).json({ message: "Freelancer ID is required" });
    }

    const applications = await JobApplication.find({ freelancerId })
      .populate({
        path: "jobId",
        select: "title jobDescription budget",
      })
      .select("applicationStatus bidAmount")
      .exec();

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.status(200).json({
      message: "Applications retrieved successfully",
      applications,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
