import express from "express";
import {
  employerGetAllApplications,
  jobseekerGetAllApplications,
  postApplication,
  getSingleApplication,
  getAllApplications,deleteApplication,
   // New route for getting a single application
} from "../controllers/applicationController.js";
import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
router.get("/:_id", isAuthenticated, getSingleApplication);
router.get("/admin/getall", isAuthenticated, authorizeAdmin, getAllApplications);
router.delete("/admin/delete/:id", isAuthenticated, authorizeAdmin, deleteApplication); // Route for getting a single application

export default router;




