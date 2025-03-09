import { Router } from "express";
import { getAllCompanies,getAllFreelancers,getCompanyById,getFreelancerById } from "../../controllers/AdminControllers/AdminAuthController.js";


const router = Router();
router.get("/companies", getAllCompanies);
router.get('/freelancers', getAllFreelancers);
router.get('/companies/:companyId',getCompanyById);
router.get('/freelancers/:freelancerId', getFreelancerById);


export default router;