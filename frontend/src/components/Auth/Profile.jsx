  import React, { useContext, useEffect, useState } from "react";
  import axios from "axios";
  import { Context } from "../../main";
  import toast from "react-hot-toast";
  import ResumeModal from "./ResumeModal";

  const Profile = () => {
    const { user } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [showInputFields, setShowInputFields] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [resumeImageUrl, setResumeImageUrl] = useState("");
    const [resume, setResume] = useState(null);
    
  const handleFileChange = (event) => {
  const resume = event.target.files[0];
  setResume(resume);
  };

    const [additionalProfileData, setAdditionalProfileData] = useState({
      birthdate: "",
      location: "",
      university: "",
      resume: null, 
    });
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          if (user && user._id) {
            const response = await axios.get(
              `http://localhost:4000/api/v1/user/profile/${user._id}`,
              {
                withCredentials: true,
              }
            );
            setProfileData(response.data.user);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };
      fetchProfileData();
    }, [user]);

    useEffect(() => {
      if (
        profileData &&
        profileData.birthdate &&
        profileData.location &&
        profileData.university 
      ) {
        setIsProfileComplete(true);
      }
    }, [profileData]);

    const handleCompleteProfile = () => {
      setShowInputFields(true);
    };
    const handleEdit = () => {
      setIsEditing(!isEditing);
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAdditionalProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  
      if (name === "birthdate") {
        const dateObject = new Date(value);
        setDay(dateObject.getDate());
        setMonth(dateObject.getMonth() + 1);
        setYear(dateObject.getFullYear());
      }
    };

    
    const handleSaveProfile = async () => {
      const formData = new FormData();
      formData.append("birthdate", additionalProfileData.birthdate);
      formData.append("location", additionalProfileData.location);
      formData.append("university", additionalProfileData.university);
      if (resume) {
        formData.append("resume", resume);
        }
      try {
        const response = await axios.post(
          `http://localhost:4000/api/v1/user/profileadd/${user._id}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProfileData(response.data.user);
        setShowInputFields(false);
        setIsProfileComplete(true);
        toast.success("Profile saved successfully!");
        
      } catch (error) {
        console.log(error);
        toast.error("Failed to save profile.");
      }
    };

    
    const openModal = (imageUrl) => {
      setResumeImageUrl(imageUrl);
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };
    return (
      <div>
        
        <div className="avatar-container">
          {isProfileComplete && profileData?.resume ? (
            <div className="resume-image-container">
              <img
                className="resume-image"
                src={profileData.resume.url}
                alt="resume"
                onClick={() => openModal(profileData.resume.url)}
              />
            </div>
          ) : (
            <div className="avatar">{profileData?.name.charAt(0).toUpperCase()}</div>
          )}
          <div className="profile-name">{profileData?.name}</div>
        </div>
        <div className="profile-info">
          <p>Email: {profileData?.email}</p>
          <p>Phone: {profileData?.phone}</p>
          <p>Your Role is: {profileData?.role}</p>
          
          {isProfileComplete && (
            <>
              <p>Birthdate: {new Date(profileData?.birthdate).toLocaleDateString()}</p>
              <p>Address: {profileData?.location}</p>
              <p>University: {profileData?.university}</p>
            </>
          )}
        </div>
        {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
    
        {!isProfileComplete && !showInputFields && (
          <div className="button-container">
            <button onClick={handleCompleteProfile} className="button">
              Complete Profile
            </button>
          </div>
        )}
    
    {isProfileComplete && (
  <div className="button-container">
    <span className="button-gap"> </span>
    <button onClick={handleEdit} className="button">
      Edit
    </button>
  </div>
)}

{isEditing && (
  <div className="blur-background">
     <div className="popup-container">
    <h3>Edit Profile</h3>
    <button className="cancel-button" onClick={handleEdit}>
      X
    </button>
    <div className="input-container">
      <label>Birthdate:</label>
      <input
        type="date"
        name="birthdate"
        value={additionalProfileData.birthdate}
        onChange={handleChange}
      />
    </div>
    <div className="input-container">
      <label>Location:</label>
      <input
        type="text"
        name="location"
        value={additionalProfileData.location}
        onChange={handleChange}
      />
    </div>
    <div className="input-container">
      <label>University:</label>
      <input
        type="text"
        name="university"
        value={additionalProfileData.university}
        onChange={handleChange}
      />
    </div>
    <div>
      <label
        style={{ textAlign: "start", display: "block", fontSize: "20px" }}
      >
        Select Resume
      </label>
      <input
        type="file"
        accept=".pdf, .jpg, .png"
        onChange={handleFileChange}
        style={{ width: "100%" }}
      />
    </div>
    <div className="button-container">
      <button onClick={handleSaveProfile} className="button">
        Edit Profile
      </button>
    </div>
    </div>
  </div>
)}


        {showInputFields && (
          <div className="blur-background">
            <div className="popup-container">
              <h3>Complete Your Profile</h3>
              <button className="cancel-button" onClick={() => setShowInputFields(false)}>
                X
              </button>
              <div className="input-container">
                <label>Birthdate:</label>
                <input
                  type="date"
                  name="birthdate"
                  value={additionalProfileData.birthdate}
                  onChange={handleChange}
                />
              </div>
              <div className="input-container">
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={additionalProfileData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="input-container">
                <label>University:</label>
                <input
                  type="text"
                  name="university"
                  value={additionalProfileData.university}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  style={{ textAlign: "start", display: "block", fontSize: "20px" }}
                >
                  Select Resume
                </label>
                <input
                  type="file"
                  accept=".pdf, .jpg, .png"
                  onChange={ handleFileChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="button-container">
                <button onClick={handleSaveProfile} className="button">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  export default Profile;