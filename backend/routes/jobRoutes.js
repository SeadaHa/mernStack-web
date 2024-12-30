import express from "express";
import {
  deleteJob,
  getAllJobs,
  getCustomizedJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
  getAllJobsAdmin,
} from "../controllers/jobController.js";
import { isAuthenticated,authorizeAdmin  } from "../middlewares/auth.js";
const router = express.Router();
router.get("/getall", getAllJobs);
router.get("/getcustomized", isAuthenticated, getCustomizedJobs); // New route for fetching customized jobs
router.post("/post", isAuthenticated, postJob);
router.get("/getmyjobs", isAuthenticated, getMyJobs);
router.put("/update/:id", isAuthenticated, updateJob);
router.delete("/delete/:id", isAuthenticated, deleteJob);
router.get("/:id", isAuthenticated, getSingleJob);
router.get("/admin/getall", isAuthenticated, authorizeAdmin, getAllJobsAdmin);
export default router;

