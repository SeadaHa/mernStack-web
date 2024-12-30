import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const CustomizedJobs = ({ user }) => {
  const [customizedJobs, setCustomizedJobs] = useState([]);

  useEffect(() => {
    const fetchCustomizedJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/job/getcustomized", {
          withCredentials: true,
        });
        const { jobs } = response.data; // Destructure the 'jobs' property from the response
        
        setCustomizedJobs(jobs);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchCustomizedJobs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <section className="jobs page">
      <div className="container">
        <h1 style={{ color: "cadetblue" }}>Customized Jobs</h1>
        {customizedJobs.length > 0 ? (
          <div className="banner">
            {customizedJobs.map((element) => (
              <div className="card" key={element._id}>
                <h4>{element.title}</h4>
                <p style={{ color: "cadetblue" }}>{element.companyName}</p>
                <p style={{ fontSize: "15px" }}>{element.employmentType}</p>
                <p style={{ fontSize: "14px", color: "gray" }}>
                  Deadline: {formatDate(element.applicationDeadline)}
                </p>
                <div className="mylink">
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No customized jobs available.</p>
        )}
      </div>
    </section>
  );
};

export default CustomizedJobs;