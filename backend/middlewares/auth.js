import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});


export const authorizeAdmin = catchAsyncErrors(async(req, res , next)=> 
{
  if(!req.user.isAdmin){
    return next(new ErrorHandler("only admin can access this resource", 403));
  }
  next();
})
