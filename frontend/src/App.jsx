import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import AdminNavbar from "./components/Layout/AdminNavbar";
import Footer from "./components/Layout/Footer";
import Profile from "./components/Auth/Profile";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import ApplicantApplications from "./components/Application/ApplicantApplications";
import ApplicantDetail from "./components/Application/ApplicantDetail";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";
import CustomizedJobs from "./components/Job/CustomizedJobs";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";
import JobPage from "./components/jobPage";
import ApplicationPage from "./components/ApplicationPage";
import AboutUs from "./components/Auth/AboutUs";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser, user } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized, setIsAuthorized, setUser]);

  return (
    <>
      <BrowserRouter>
       <Footer />
        {user && user.isAdmin ? <AdminNavbar /> : <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:_id" element={<Profile />} />
          <Route path="/" element={<Home />} />
          
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route
            path="/applications/employer"
            element={<ApplicantApplications />}
          />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/applications/:_id" element={<ApplicantDetail />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/job/customized" element={<CustomizedJobs />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/myuser" element={<UserPage />} />
          <Route path="/myjob" element={<JobPage />} />
          <Route path="/myapplication" element={<ApplicationPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
     
        
        <Toaster />
        
      </BrowserRouter>
    </>
  );
};

export default App;