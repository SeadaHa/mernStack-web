import React from "react";

const CompleteProfile = ({ handleSaveProfile, handleChange, additionalProfileData }) => {
  return (
    <div>
      <h2>Complete Profile</h2>
      <div>
        <label>Birthdate:</label>
        <input
          type="text"
          name="birthdate"
          value={additionalProfileData.birthdate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={additionalProfileData.location}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Interests:</label>
        <input
          type="text"
          name="interests"
          value={additionalProfileData.interests}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>University:</label>
        <input
          type="text"
          name="university"
          value={additionalProfileData.university}
          onChange={handleChange}
        />
      </div>
      <div className="button-container">
        <button onClick={handleSaveProfile} className="button">
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default CompleteProfile;