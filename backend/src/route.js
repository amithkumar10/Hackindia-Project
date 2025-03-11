import express from "express";
import companyAuthRoutes from "./routes/CompanyRoutes/CompanyAuthRoutes.js";
import adminAuthRoutes from "./routes/AdminRoutes/AdminAuthRoutes.js";
import FreelancerAuthRoutes from "./routes/FreelancerRoutes/FreelancerAuthRoutes.js";
import FreelancerJobRoutes from "./routes/FreelancerRoutes/FreelancerJobRoutes.js";
import MessagesRoutes from "./routes/MessagesRoutes/MessageRoutes.js";
import GeminiRoutes from "./routes/GeminiRoutes/GeminiRoutes.js";

const router = express.Router();
router.use("/company", companyAuthRoutes);
router.use("/admin", adminAuthRoutes);
router.use("/freelancer", FreelancerAuthRoutes);
router.use("/freelancerjob", FreelancerJobRoutes);
router.use("/messages", MessagesRoutes);
router.use("/gemini", GeminiRoutes);

export default router;
