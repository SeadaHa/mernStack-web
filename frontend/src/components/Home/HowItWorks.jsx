import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  const navigateTo = useNavigate();
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Ethiohire Works</h3>
          <div className="banner">
            <div className="cardd">
              <FaUserPlus />
              
                <Link to={"/register"}><p>Create Account</p></Link>
              
              <p >
                Register as a jobseeker if you want to access jobseeker pages.
                Register as employer if you want to access employer pages.
              </p>
            </div>
            <div className="cardd">
              <MdFindInPage />
              <Link to={"/job/getall"}> <p>Find a Job</p></Link>
              <p>
                get all available jobs
              </p>
              <p>Post a Job</p>
              <p>
                You can post jobs after registering as an employer.
              </p>
            </div>
            <div className="cardd">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
             You can apply for a job after registering as a job seeker.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
