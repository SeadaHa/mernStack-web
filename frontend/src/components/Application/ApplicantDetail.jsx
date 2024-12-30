import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ApplicantDetail = () => {
  const { _id } = useParams();
  const [application, setApplication] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/application/${_id}`, {
          withCredentials: true,
        });
        setApplication(response.data.application);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplication();
  }, [_id]);

  const openResumeModal = () => {
    setShowResumeModal(true);
  };

  const closeResumeModal = () => {
    setShowResumeModal(false);
  };

  if (!application) {
    return <p>Loading applicant details...</p>;
  }

  return (
    <div className="job_seeker_card">
      <div className="detail">
        <h2>Applicant Detail</h2>
        <p>Name: {application.name}</p>
        <p>Email: {application.email}</p>
        <p>Phone: {application.phone}</p>
        <p>Address:{application.address}</p>
        <p>field Of Expertise:{application.fieldOfExpertise}</p>
        <p>work Experience:{application.workExperience} year</p>
        <p>CoverLetter: {application.coverLetter}</p>
        <button style={{width: '107px',height:'26px', backgroundColor:'cadetblue',border:'none'}} onClick={openResumeModal}>View Resume</button>
      </div>
      {showResumeModal && (
        <div className="resume-modal">
          <div className="resume-modal-content">
            <span className="close-button" onClick={closeResumeModal}>
              &times;
            </span>
            <img src={application.resume.url} alt="resume" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantDetail;