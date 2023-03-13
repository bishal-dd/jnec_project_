import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComp from "./components/NavbarComp/NavbarComp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeComp from "./components/HomeComp/HomeComp";
import AdminEventComp from "./components/AdminEventComp/AdminEventComp";
import AdminLoginComp from "./components/AdminLoginComp/AdminLoginComp";
import EventPageComp from "./components/EventPageComp/EventPageComp";
import AboutusPageComp from "./components/AboutusPageComp/AboutusPageComp";
import ProtectedRoute from "./Route/ProtectedRoute";
import ProjectmemberComp from "./components/ProjectmemberComp/ProjectmemberComp";
import AdddownloadComp from "./components/AdddownloadComp/AdddownloadComp";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // const [loggedin, setLoggedin] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/api/getLoggedInStatus")
  //     .then((response) => {
  //       console.log(response.data);
  //       setLoggedin(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" />
        <NavbarComp />
        <Routes>
          <Route element={<ProtectedRoute isAuth={true} />}>
            <Route path="/adminevents" element={<AdminEventComp />} />
          </Route>
          <Route path="/" element={<HomeComp />} />
          <Route path="/projectmembers" element={<ProjectmemberComp />} />
          <Route path="adminlogin" element={<AdminLoginComp />} />
          <Route path="events" element={<EventPageComp />} />
          <Route path="/aboutus" element={<AboutusPageComp />} />
          <Route path="/adddownloads" element={<AdddownloadComp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
