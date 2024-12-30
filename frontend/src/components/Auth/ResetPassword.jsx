import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Password match validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/user/reset-password/${resetToken}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ color: "#333" }}>Reset Password</h2>
      <form onSubmit={handleResetPassword} style={{ display: "inline-block", textAlign: "left" }}>
        <label style={{ display: "block", marginBottom: "8px" }}>New Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <label style={{ display: "block", marginBottom: "8px" }}>Confirm New Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{ display: "block", marginBottom: "15px", padding: "5px 10px", backgroundColor: "white", color: "#00563B", border: "none", cursor: "pointer" }}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#00563B", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;