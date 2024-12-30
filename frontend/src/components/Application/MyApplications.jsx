import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import ResumeModal from "./ResumeModal";

const MyApplication = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [displayResume, setDisplayResume] = useState(false);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setApplications(res.data.applications);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setDisplayResume(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setDisplayResume(false); // Add this line to reset the displayResume state
  };

  return (
    <section className="my_applications page">
      <div className="container">
        <h1 style={{ color: "cadetblue" }}>My Applications</h1>
        {applications.length <= 0 ? (
          <h4>No Applications Found</h4>
        ) : (
          applications.map((element) => {
            return (
              <JobSeekerCard
                element={element}
                key={element._id}
                openModal={() => openModal(element.resume.url)}
              />
            );
          })
        )}
      </div>
      {modalOpen && (
        <ResumeModal
          imageUrl={resumeImageUrl}
          onClose={closeModal}
          displayResume={displayResume}
        />
      )}
       {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

const JobSeekerCard = ({ element, openModal, displayResume }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
      <p style={{ fontStyle:'oblique', fontWeight:'bold', fontSize:'27px' }}>
          <span>Job Title:</span> {element.jobId.title}
        </p>
        <p>
          <span style={{fontWeight:'bold',fontStyle:'oblique', fontSize:'18px'}}>Name:</span> {element.name}
        </p>
        <p>
          <span style={{fontWeight:'bold',fontStyle:'oblique', fontSize:'18px'}}>Email:</span> {element.email}
        </p>
        <p>
          <span style={{fontWeight:'bold',fontStyle:'oblique', fontSize:'18px'}}>Phone:</span> {element.phone}
        </p>
        <p>
          <span style={{fontWeight:'bold',fontStyle:'oblique', fontSize:'18px'}}>Address:</span> {element.address}
        </p>
        <p>
          <span style={{fontWeight:'bold',fontStyle:'oblique', fontSize:'18px'}}>field Of Expertise:</span> {element.fieldOfExpertise}
        </p>
        <p>
          <span style={{fontWeight:'bold',fontStyle:'oblique', fontSize:'18px'}}>work Experience:</span> {element.workExperience} Year
        </p>
        <p>
          <span style={{fontWeight:'bold',fontStyle:'oblique', fontSize:'18px'}}>CoverLetter:</span> {element.coverLetter}
        </p>
        <div className="resume">
        {displayResume ? (
          <img
            src={element.resume.url}
            alt="resume"
            onClick={openModal}
          />
        ) : (
          <button onClick={openModal}>Display Resume</button>
        )}
      </div>
      </div>
      
    </div>
  );
};

export default MyApplication;