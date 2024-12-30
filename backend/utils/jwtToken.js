
import dotenv from "dotenv";

dotenv.config();
export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + 23 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true
  };

  // Convert COOKIE_EXPIRE to seconds for expiresIn
  const expiresIn = 24 * 60 * 60; // Convert days to seconds

  res.status(statusCode).cookie("token", token, { ...options, maxAge: expiresIn*1000 }).json({
    success: true,
    user,
    message,
    token,
  });
};
