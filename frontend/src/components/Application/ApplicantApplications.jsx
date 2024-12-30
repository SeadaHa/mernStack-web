import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import ApplicantDetail from "./ApplicantDetail";

const ApplicantApplications = () => {
  const { isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/application/employer/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setApplications(res.data.jobApplications);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="my_applications page">
      <div className="container">
        <h1>Applicant's Applications</h1>
        <div className="job-titles-container">
          {applications.length <= 0 ? (
            <h6>No Applications Found</h6>
          ) : (
            applications.map((jobApplication) => (
              <div key={jobApplication.jobTitle} className="job-application">
                <div className="job-title-container">
                  <h5>Job Title: {jobApplication.jobTitle}</h5>
                  <div className="applicant-list">
                    {jobApplication.applicants.length === 0 ? (
                      <p class="no-applications">No Applications Found for this job</p>
                    ) : (
                      jobApplication.applicants.map((applicant) => (
                        <div className="applicant-card" key={applicant.applicationId}>
                          <div className="applicant-name">{applicant.name}</div>
                          <Link to={`/applications/${applicant.applicationId}`}>
                            <span className="applicant-detail-link">Applicant Detail</span>
                          </Link>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplicantApplications;