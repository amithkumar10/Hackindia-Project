import express from "express";
import {
  getMatchingJobs,
  applyForJob,
  getFreelancerApplications,
  getAllJobs,
} from "../../controllers/FreelancerControllers/FreelancerJobController.js";

const router = express.Router();

router.get("/allJobs", getAllJobs);
router.get("/:freelancerId", getMatchingJobs);
router.post("/apply", applyForJob);
router.get("/applications/:freelancerId", getFreelancerApplications);

export default router;
