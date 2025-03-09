import express from "express";
import companyAuthRoutes from "./routes/CompanyRoutes/CompanyAuthRoutes.js"
import freelancerAuthRoutes from "./routes/FreelancerRoutes/FreelancerAuthRoutes.js";
import adminAuthRoutes from "./routes/AdminRoutes/AdminAuthRoutes.js";

const router = express.Router();
router.use("/company", companyAuthRoutes);
router.use("/freelancer", freelancerAuthRoutes);
router.use("/admin", adminAuthRoutes);
export default router;
