import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';
import cloudinary from 'cloudinary';

export const ResetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetToken = req.params.resetToken;
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid or expired reset token", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully.",
  });
});



export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Please provide your email.", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email.", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  const message = "Your password reset token is as follows:\n\n" + resetUrl + "\n\nIf you have not requested this email, please ignore it.";

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Token",
      message,
    });

    res.status(200).json({
      success: true,
      message: "Email sent with password reset instructions.",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler("Email could not be sent.", 500));
  }
});


export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role, jobCategory, fieldOfExpertise } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill in all the required fields."));
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }

  const user = new User({
    name,
    email,
    phone,
    password,
    role,
  });

  if (role === "Job Seeker") {
    user.jobCategory = jobCategory;
    user.fieldOfExpertise = fieldOfExpertise;
  }
  await user.save();
  sendToken(user, 201, res, "User Registered!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password, and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler(`User with provided email and ${role} not found!`, 404));
  }
  // Update to include isAdmin in the response
  const response = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  };

  sendToken(user, 201, res, "User Logged In!", response);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});



export const getProfile = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.params;
  if (!_id) {
    return next(new ErrorHandler("Please provide a user ID", 400)); // Custom error with status code 400 (Bad Request)
  }
  try {
    const user = await User.findById(_id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({ user }); // Return the entire user object
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
});

export const saveProfile = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.params;
  const { birthdate, location, university } = req.body;
  const { resume } = req.files; // Add this line to get the 'resume' file from req.files

  if (!_id) {
    return next(new ErrorHandler("Please provide a user ID", 400));
  }

  try {
    const user = await User.findById(_id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (birthdate) {
      user.birthdate = birthdate;
    }
    if (location) {
      user.location = location;
    }
    if (university) {
      user.university = university;
    }

    if (resume) {
      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedFormats.includes(resume.mimetype)) {
        return next(new ErrorHandler("Invalid file type. Please upload a PNG file.", 400));
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
      }

      user.resume = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }

    await user.save();
    res.status(200).json({ success: true, message: "Profile information saved successfully" });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
});





export const adminLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password.", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.isAdmin) {
    return next(new ErrorHandler("Invalid Email Or Password for Admin.", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password for Admin.", 400));
  }

  sendToken(user, 200, res, "Admin Logged In!");
});

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully.",
  });
});