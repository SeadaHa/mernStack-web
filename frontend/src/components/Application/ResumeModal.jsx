import React from "react";

const ResumeModal = ({ imageUrl, onClose, displayResume }) => {
  return (
    <div className={`resume-modal ${displayResume ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {displayResume && <img src={imageUrl} alt="resume" />}
      </div>
    </div>
  );
};

export default ResumeModal;