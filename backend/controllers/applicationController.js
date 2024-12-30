import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;

  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "application/pdf"];
  
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please uploada PNG file.", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }
  const { name, email, coverLetter, phone, address,workExperience,fieldOfExpertise, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID ||
    !workExperience||
    !fieldOfExpertise||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    workExperience,
    fieldOfExpertise,
    applicantID,
    employerID,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    jobId, // Include the jobId in the created application
  });
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
  }
  const { _id } = req.user;
  const jobs = await Job.find({ postedBy: _id });
  const jobApplications = [];
  for (const job of jobs) { 
    const applications = await Application.find({ "employerID.user": _id, jobId: job._id }); 
    const applicants = [];   
    for (const application of applications) {
       const { name, _id: applicationId } = application;
      applicants.push({
        name,
        applicationId,
      });
    }
    jobApplications.push({
      jobTitle: job.title,
      applicants,
    });
  }

  res.status(200).json({
    success: true,
    jobApplications,
  });
});

export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role, _id } = req.user; // Destructure _id from req.user
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    
    // Fetch the applications for the authenticated jobseeker
    const applications = await Application.find({ "applicantID.user": _id })
      .populate({
        path: 'jobId',
        select: 'title'
      })
      .exec();
    
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const getSingleApplication = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.params;
  try {
    const application = await Application.findById(_id).populate("jobId");
    if (!application) {
      return next(new ErrorHandler("Application not found.", 404));
    }
    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});

export const getAllApplications = catchAsyncErrors(async (req, res, next) => {
  const applications = await Application.find();
  res.status(200).json({
    success: true,
    applications,
  });
});

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
const { id } = req.params;
const application = await Application.findById(id);
if (!application) {
  return next(new ErrorHandler("Application not found!", 404));
}
await application.deleteOne();
res.status(200).json({
  success: true,
  message: "Application Deleted!",

});
});
