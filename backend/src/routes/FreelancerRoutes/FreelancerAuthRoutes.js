import express from 'express';
import { sendJobApplication } from '../../controllers/FreelancerConrollers/FreelancerAuthController.js';


const router = express.Router();

router.post('/applyJob/:jobId', sendJobApplication);

export default router;