import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <img src="/logo.jpg" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/job/getall"}>All Jobs</Link>
          </li>
          
          
          {!isAuthorized && (
            <>
            <li>
            <Link to={"/aboutus"}>About Us</Link>
          </li>
            <li>
                <Link to={"/register"}>Signup</Link>
              </li>
              
              <li>
                <Link to={"/login"}>Login</Link>
              </li>

              
            </>
          )}


          {isAuthorized && (
            <>
              <li>
                <Link
                  to={
                    user && user.role === "Employer"
                      ? "/applications/employer"
                      : "/applications/me"
                  }
                  onClick={() => setShow(false)}
                >
                  {user && user.role === "Employer"
                    ? "Appicant's Application"
                    : "My Applications"}
                </Link>
              </li>
              {user && user.role === "Employer" && (
                <>
                  <li>
                    <Link to={"/job/post"} onClick={() => setShow(false)}>
                      Post a new job
                    </Link>
                  </li>
                  <li>
                    <Link to={"/job/me"} onClick={() => setShow(false)}>
                      View your jobs
                    </Link>
                  </li>
                </>
              )}
              {user && user.role === "Job Seeker" && (
                <>
                  <li>
                    <Link to={"/job/customized"} onClick={() => setShow(false)}>
                      Custumized Jobs
                    </Link>
                  </li>
                </>
              )}
              <div className="profile-icon">
            <Link to={"/profile/:id"}>
              <img src="/image.png"  alt="Profile" />
            </Link>
          </div>
              
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              
            </>
            
          )}
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;