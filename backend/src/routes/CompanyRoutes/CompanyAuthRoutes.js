import {Router} from "express";
import { companyLogin,companyRegister,getProfile,updateProfile,addJob,getAllJobs,getActiveJobs,updateActiveJobStatus,getJobApplicants,getProjectDetails,getJobById,acceptApplicant,rejectApplicant,shortlistApplicant,
    getShortlistedApplicants
 } from "../../controllers/CompanyControllers/CompanyAuthController.js";


const router = Router();

router.post("/register", companyRegister);
router.post("/login", companyLogin);
router.get("/profile/:companyId", getProfile);
router.put("/profile/:companyId", updateProfile);
router.post("/job/:companyId", addJob);
router.get("/job/:jobId", getJobById);
router.get("/jobs/:companyId", getAllJobs);
router.get("/ongoingJobs/:companyId", getActiveJobs);
router.put("/activeJobStatus/:companyId/:jobId", updateActiveJobStatus);
router.get("/jobApplicants/:companyId/:jobId", getJobApplicants);
router.get("/projectDetails/:companyId/:jobId", getProjectDetails);
router.put("/acceptApplicant/:companyId/:jobId/", acceptApplicant);
router.put("/rejectApplicant/:companyId/:jobId/", rejectApplicant);

//shortlisted 
router.put("/shortlist/:jobId/",shortlistApplicant);
router.get("/shortlisted/:companyId/:jobId/",getShortlistedApplicants);

export default router;
