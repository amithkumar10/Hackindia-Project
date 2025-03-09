import { JobApplication } from "../../models/JobApplicationModel.js";
import { JobPosting } from "../../models/JobPostingModel.js";

export const sendJobApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { freelancerId, bidAmount, proposal } = req.body;

    if (!jobId || !freelancerId || !bidAmount || !proposal) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new job application
    const newApplication = await JobApplication.create({
      jobId,
      freelancerId,
      bidAmount,
      proposal,
      applicationStatus: "pending",
    });

    if (!newApplication) {
      return res.status(400).json({ message: "Job application creation failed" });
    }

    // Add the application to the job posting's applications array
    await JobPosting.findByIdAndUpdate(
      jobId,
      { $push: { applications: newApplication._id } },
      { new: true }
    );

    return res.status(201).json({ message: "Job application sent successfully", application: newApplication });
  } catch (error) {
    console.error("Error sending job application:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};