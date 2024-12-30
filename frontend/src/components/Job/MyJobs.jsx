import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };
  const handleDisableEdit = () => {
    setEditingMode(null);
  };
  
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };


  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (  
    <>
      <div className="myJobs page">
        <div className="container">
          <h1 style={{color: 'cadetblue'}}>Your Posted Jobs</h1>
          {myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((element) => (
                  <div className="cards" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Title:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id ? true : false}
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(element._id, "title", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span>Address:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id ? true : false}
                            value={element.address}
                            onChange={(e) =>
                              handleInputChange(element._id, "address", e.target.value)
                            }
                          />
                        </div>
                      
                        <div>
                          <span>JobCategory:</span>
                          <select
                            value={element.jobCategory}
                            onChange={(e) =>
                              handleInputChange(element._id, "jobCategory", e.target.value)
                            }
                            disabled={editingMode !== element._id ? true : false}
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
                        </div>
                        <div>
                          <span>Salary:</span>
                          <input
                            type="number"
                            disabled={editingMode !== element._id ? true : false}
                            value={element.salary}
                            onChange={(e) =>
                              handleInputChange(element._id, "salary", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span>Expired:</span>
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(element._id, "expired", e.target.value)
                            }
                            disabled={editingMode !== element._id ? true : false}
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          <span>Description:</span>
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={editingMode !== element._id ? true : false}
                            onChange={(e) =>
                              handleInputChange(element._id, "description", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span>Employment Type:</span>
                          <select
                            value={element.employmentType}
                            disabled={editingMode !== element._id ? true : false}
                            onChange={(e) =>
                              handleInputChange(element._id, "employmentType", e.target.value)
                            }
                          >
                            <option value="">Select Employment Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                          </select>
                        </div>
                        <div>
                          <span>Experience Level:</span>
                          <select
                            value={element.experienceLevel}
                            disabled={editingMode !== element._id ? true : false}
                            onChange={(e) =>
                              handleInputChange(element._id, "experienceLevel", e.target.value)
                            }
                          >
                            <option value="">Select Experience Level</option>
                            <option value="Junior Level">Junior Level</option>
                            <option value="Middle Level">Middle Level</option>
                            <option value="Senior Level">Senior Level</option>
                          </select>
                        </div>
                        
                        <div>
                          <span>application Deadline : </span>
                          <textarea
                            value={element.applicationDeadline}
                            rows={5}
                            disabled={editingMode !== element._id ? true : false}
                            onChange={(e) =>
                              handleInputChange(element._id, "applicationDeadline", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* Out Of Content Class */}
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteJob(element._id)}
                        className="delete_btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
