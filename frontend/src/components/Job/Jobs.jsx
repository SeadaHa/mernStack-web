import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
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
        <h1 style={{ color: "cadetblue" }}>All Available Jobs</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <div className="topper">
                    <p>{element.title}</p>
                    <p style={{ color: "cadetblue" }}>{element.companyName}</p>
                    <p style={{ fontSize: "15px" }}>{element.employmentType}</p>
                    <p>Deadline: {formatDate(element.applicationDeadline)}</p>
                  </div>
                  <div className="mylink">
                    <Link to={`/job/${element._id}`}>Job Details</Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;