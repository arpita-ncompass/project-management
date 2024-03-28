import React from "react";
import { Route, Routes } from 'react-router-dom';

import HomePage from "../Components/HomePage/HomePage";
import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/SignUp";
import ProjectsPage from "../Components/Projects/Project";
import AddProject from "../Components/Projects/AddProject";

const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/getProjects" element={<ProjectsPage />} />
            <Route path="/addProject" element={<AddProject />} />
        </Routes>
    )
}

export default Router;