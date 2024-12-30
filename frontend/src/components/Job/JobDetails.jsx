import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="job-details-section">
      <div className="container">
        <h2 className="section-title">Job Details</h2>
        <div className="job-details-card">
          <div className="job-details-header">
            <h3>Job Title : {job.title}</h3>
            <p>
              <strong>company name :</strong> {job.companyName}
            </p>
            
          </div>
          <div className="job-details-body">
          <p>
              <strong>Job Category:</strong> {job.jobCategory}
            </p>
            <p>
              <strong>Adress:</strong> {job.address}
            </p>
            <p>
              <strong>Employment Type:</strong> {job.employmentType}
            </p>
            <p>
              <strong>Experience Level:</strong> {job.experienceLevel}
            </p>
            <p>
              <strong>Salary:</strong> {job.salary}
            </p>
            <p>
              <strong>Description:</strong> {job.description}
            </p>
            <p>
              <strong>Job Posted On:</strong> {job.jobPostedOn}
            </p>
            <p>
              <strong>Application Deadline : </strong> {job.applicationDeadline}
            </p>
          </div>
          <div className="job-details-footer">
            {user && user.role === "Employer" ? null : (
              <Link to={`/application/${job._id}`} className="apply-btn">
                Apply Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;