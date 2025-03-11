import express from "express";
import { enhanceProposal } from "../../controllers/GeminiContollers/GeminiController.js";

const router = express.Router();

router.post("/getGeminiData", enhanceProposal);

export default router;
