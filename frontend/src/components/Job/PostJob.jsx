import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleJobPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        {
          title,
          description,
          jobCategory,
          companyName,
          employmentType,
          experienceLevel,
          applicationDeadline,
          salary,
          address,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      navigateTo("/job/getall"); // Navigate to the "All Jobs" page
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h6>POST NEW JOB</h6>
          <div className="form-container">
            <form onSubmit={handleJobPost} className="form">
              <div className="wrapper">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Job Title"
                  className="input"
                />
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company Name"
                  className="input"
                />
              </div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ethiopia, Addiss Ababa,Bole"
                className="input"
              />
              <div className="wrapper">
                <select
                  value={jobCategory}
                  onChange={(e) => setJobCategory(e.target.value)}
                  className="select"
                >
                  <option value="">Select Category The Job Includes</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Engineering and Architecture">Engineering and Architecture</option>
                  <option value="Business & Management">Business & Management</option>
                  <option value="Social Sciences and Humanities">Social Sciences and Humanities</option>
                  <option value="Teaching">Teaching</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Sciences">Sciences</option>
                  <option value="Administrative & Support Services">Administrative & Support Services</option>
                  <option value="Other">Other</option>
                </select>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="select"
                >
                  <option value="">Select Employment Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>
              
              <div className="wrapper">
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="select"
                >
                  <option value="">Select Experience Level</option>
                  <option value="Junior Level">Junior Level</option>
                  <option value="Middle Level">Middle Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
                
              </div>
              
              <label htmlFor="applicationDeadline">Application Deadline</label>
              <input
                type="date"
                id="applicationDeadline"
                value={applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
                className="input"
              />

              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Salary (optional)"
                className="input"
              />
              <textarea
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Job Description"
                className="textarea"
              />
              
              <button type="submit" className="btnn">
                Post Job
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostJob;