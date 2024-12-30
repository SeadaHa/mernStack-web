import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../main";
import { Navigate, Link } from "react-router-dom";
import pic1 from "./images/pic1.jpg";

const AdminPage = () => {
  const { isAuthorized } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, jobsResponse, applicationsResponse] = await Promise.all([
          axios.get("http://localhost:4000/api/v1/user/admin/users", { withCredentials: true }),
          axios.get("http://localhost:4000/api/v1/job/admin/getall", { withCredentials: true }),
          axios.get("http://localhost:4000/api/v1/application/admin/getall", { withCredentials: true }),
        ]);

        console.log("Users data:", usersResponse.data.users);
        console.log("Jobs data:", jobsResponse.data.jobs);
        console.log("Applications data:", applicationsResponse.data.applications);

        setUsers(usersResponse.data.users);
        setJobs(jobsResponse.data.jobs);
        setApplications(applicationsResponse.data.applications);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  const styles = {
    adminPage: {
      display: 'flex',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundImage: `url(${pic1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    },
    sidebar: {
      width: '200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingRight: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: to make sidebar readable over background
      padding: '10px',
      borderRadius: '10px',
    },
    linkButton: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      padding: '10px',
      margin: '10px 0',
      color: '#fff',
      backgroundColor: '#6c757d', // Changed button color to light gray
      textDecoration: 'none',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
    },
    content: {
      flex: 1,
      textAlign: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: to make content readable over background
      padding: '20px',
      borderRadius: '10px',
    },
    notes: {
      marginTop: '10px',
      color: '#555',
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    }
  };

  return (
    <div style={styles.adminPage}>
      <div style={styles.sidebar}>
        <Link to="/myuser" style={styles.linkButton}>See All Users</Link>
        <Link to="/myjob" style={styles.linkButton}>See All Jobs</Link>
        <Link to="/myapplication" style={styles.linkButton}>See All Applications</Link>
      </div>
      <div style={styles.content}>
        <h1 style={styles.title}>Admin Page</h1>
        <div style={styles.notes}>
          <p>Some important notes go here. Make sure to read them carefully.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;