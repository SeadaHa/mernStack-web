import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../main";
import { Navigate, Link } from "react-router-dom";

const ApplicationPage = () => {
  const { isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applicationsResponse] = await Promise.all([
          axios.get("http://localhost:4000/api/v1/application/admin/getall", { withCredentials: true }),
        ]);
        setApplications(applicationsResponse.data.applications);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/application/admin/delete/${id}`, { withCredentials: true });
      setApplications(applications.filter(application => application._id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
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
      
      <div style={styles.tableContainer}>
        <h2 style={styles.subtitle}>All Applications</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td style={styles.td}>{application.name}</td>
                <td style={styles.td}>{application.email}</td>
                <td style={styles.td}>{application.phone}</td>
                <td style={styles.td}>{application.address}</td>
                <td style={styles.td}>
                  <button style={styles.button} onClick={() => deleteApplication(application._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationPage;