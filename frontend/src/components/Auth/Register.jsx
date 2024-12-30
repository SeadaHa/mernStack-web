import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [fieldOfExpertise, setFieldOfExpertise] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name || !phone || !email || !role || !password) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        {
          name,
          phone,
          email,
          role,
          password,
          jobCategory,
          fieldOfExpertise,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setJobCategory("");
      setFieldOfExpertise("");
      setIsAuthorized(true);
      setUser(data.user);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  const renderFieldOfExpertiseInput = () => {
    if (role === "Job Seeker") {
      return (
        <div className="inputTag">
          <label>Field of Expertise</label>
          <div>
            <input
              type="text"
              value={fieldOfExpertise}
              onChange={(e) => setFieldOfExpertise(e.target.value)}
            />
          </div>
        </div>
      );
    }
  };

  const renderJobCategoryInput = () => {
    if (role === "Job Seeker") {
      return (
        <div className="inputTag">
          <label>Job Category</label>
          <div>
            <select
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="HealthCare's">HealthCare's</option>
              <option value="Engineering and Architecture">Engineering and Architecture</option>
              <option value="Business & Management">Business & Management</option>
              <option value="Social Sciences and Humanities">Social Sciences and Humanities</option>
              <option value="Teaching">Teaching</option>
              <option value="social media related">social media related</option>
              <option value="Sciences">Sciences</option>
              <option value="Administrative & Support Services">Administrative & Support Services</option>
              <option value="Other categories">Other categories</option>
            </select>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
       
            <h3>Create a new account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="number"
                  placeholder="12345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            {renderFieldOfExpertiseInput()}
            {renderJobCategoryInput()}
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
            <p>Do you have an account? <Link to={"/login"}>Login Now</Link> </p>
            
          </form>
        </div>
        <div className="banner">
          <img src="/register.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Register;