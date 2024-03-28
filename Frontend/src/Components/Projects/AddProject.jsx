import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiResponse from '../../Utils/ApiResponse';
import './AddProject.css';

const AddProject = () => {
    const navigate = useNavigate();

    const [projectData, setProjectData] = useState({
        projectName: '',
        projectDescription: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData({
            ...projectData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiResponse(
                "post",
                "create-project",
                null,
                projectData
            );
            if (response.status === 201) {
                alert('Project created successfully');
                navigate('/projects');
            } else {
                console.error('Failed to create project');
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div className="add-project-container">
            <h2>Add New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="projectName">Project Name:</label>
                    <input type="text" id="projectName" name="projectName" value={projectData.projectName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="projectDescription">Project Description:</label>
                    <textarea id="projectDescription" name="projectDescription" value={projectData.projectDescription} onChange={handleInputChange} required />
                </div>
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
};

export default AddProject;
