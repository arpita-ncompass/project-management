import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../NavBar/NavBar'; 
import ProjectImg from '../../Assets/ProjectImg.jpg'; 
import ApiResponse from '../../Utils/ApiResponse';
import ProjectModal from './ProjectModal';

import './Project.css'

const ProjectsPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        if (!token) {
            navigate('/');
        } else {
            fetchProjects();
        }
    }, [navigate]);

    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem('token');
            const header = { Authorization: ` ${token}` }
            const response = await ApiResponse(
                "get",
                "get-all-products",
                null,
                null,
                header
            )
            console.log(response);
            if (response.status===200) {
                console.log(response.data.projects);
                setProjects(response.data.projects);
            } else {
                console.error('Failed to fetch projects');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const createProject = async ({ projectName, projectDescription, projectOwner }) => {
        try {
            const token = localStorage.getItem('token');
            const header = { Authorization: ` ${token}` };
            const response = await ApiResponse(
                'post',
                'create-project',
                null,
                { projectName, projectDescription, projectOwner },
                header
            );
            if (response.status === 200) {
                setProjects([...projects, response.data.project]);
            } else {
                console.error('Failed to create project');
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn}/>
            <div className="projects-container">
                {projects.map(project => (
                    <div className="project-card" key={project.id}>
                        <img src={ProjectImg} className='project-image' alt="Project" />
                        <div className="project-details">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <p>Owner: {project.owner}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* <button onClick={() => setShowModal(true)}>Add New Project</button>
            <ProjectModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onCreateProject={createProject}
            /> */}
        </div>
    );
};

export default ProjectsPage;
