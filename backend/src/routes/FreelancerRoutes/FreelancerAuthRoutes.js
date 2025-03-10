<<<<<<< HEAD
import express from "express";
import {
  signupFreelancer,
  loginFreelancer,
  getFreelancerProfile,
  updateFreelancerProfile,
} from "../../controllers/FreelancerControllers/FreelancerAuthController.js";

const router = express.Router();

router.post("/signup", signupFreelancer);
router.post("/login", loginFreelancer);
router.get("/:userId", getFreelancerProfile);
router.put("/edit/:userId", updateFreelancerProfile);

export default router;
=======
import express from 'express';
import { sendJobApplication } from '../../controllers/FreelancerConrollers/FreelancerAuthController.js';


const router = express.Router();

router.post('/applyJob/:jobId', sendJobApplication);

export default router;
>>>>>>> 446f43ab5ea471ce083909da5a43681a24ec9bc2
