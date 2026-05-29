import express from "express";
import { getJobListings, getJobById } from "../controllers/jobController";

const router = express.Router();

// Public routes - Get job listings directly from ATS database
router.get("/", getJobListings);
router.get("/:id", getJobById);

export { router as jobRoutes };
