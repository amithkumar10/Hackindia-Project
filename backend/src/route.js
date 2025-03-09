import express from "express";
import FreelancerAuthRoutes from "./routes/FreelancerRoutes/FreelancerAuthRoutes.js";
import FreelancerJobRoutes from "./routes/FreelancerRoutes/FreelancerJobRoutes.js";

const router = express.Router();

router.use("/freelancer", FreelancerAuthRoutes);
router.use("/freelancerjob", FreelancerJobRoutes);

export default router;
