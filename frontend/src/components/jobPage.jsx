import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../main";
import { Navigate, Link } from "react-router-dom";

const JobPage = () => {
  const { isAuthorized } = useContext(Context);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsResponse = await axios.get("http://localhost:4000/api/v1/job/admin/getall", { withCredentials: true });
        setJobs(jobsResponse.data.jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/job/delete/${id}`, { withCredentials: true });
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  const styles = {
    adminPage: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f4',
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    link: {
      display: 'block',
      textAlign: 'center',
      margin: '10px 0',
      color: '#007bff',
      textDecoration: 'none',
    },
    tableContainer: {
      margin: '0 auto',
      maxWidth: '80%',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    subtitle: {
      textAlign: 'center',
      color: '#666',
      marginBottom: '10px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '10px',
      textAlign: 'left',
    },
    td: {
      borderBottom: '1px solid #ddd',
      padding: '10px',
    },
    button: {
      backgroundColor: '#d9534f',
      color: '#fff',
      border: 'none',
      padding: '10px 15px',
      cursor: 'pointer',
      borderRadius: '4px',
    },
  };

  return (
    <div style={styles.adminPage}>
      <h1 style={styles.title}>Admin Page</h1>
      <Link to="/myuser" style={styles.link}>See All Users</Link>

      <div style={styles.tableContainer}>
        <h2 style={styles.subtitle}>All Jobs</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Country</th>
              <th style={styles.th}>Posted By</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td style={styles.td}>{job.title}</td>
                <td style={styles.td}>{job.category}</td>
                <td style={styles.td}>{job.country}</td>
                <td style={styles.td}>{job.postedBy}</td>
                <td style={styles.td}>{job.location}</td>
                <td style={styles.td}>
                  <button style={styles.button} onClick={() => deleteJob(job._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobPage;



























