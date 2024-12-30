import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide decription."],
    minLength: [30, "Description must contain at least 30 Characters!"],
    maxLength: [500, "Description cannot exceed 500 Characters!"],
  },
  jobCategory: {
    type: String,
    required: [true, "Please provide a category."],
  },
  companyName: {
    type: String,
    required: [true, "Please provide a company name."],
  },
  employmentType: {
    type: String,
    required: [true, "Please provide employment Type."],
  },
  experienceLevel: {
    type: String,
    required: [true, "Please provide experience Level."],
  },
  address: {
    type: String,
    required: [true, "Please provide address."],
  },

  salary: {
    type: Number,
    min: [1000, "Salary must be at least 1000"],
    max: [1000000, "Salary cannot exceed 1,000,000"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  applicationDeadline: {
    type: Date,
    required: [true, "Please provide an application deadline."],
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);