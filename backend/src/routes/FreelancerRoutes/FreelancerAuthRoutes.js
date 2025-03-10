
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
