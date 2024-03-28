import React, { useState } from 'react';

const ProjectModal = ({ isOpen, onClose, onCreateProject }) => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectOwner, setProjectOwner] = useState('');

    const handleCreateProject = () => {
        onCreateProject({ projectName, projectDescription, projectOwner });
        onClose();
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Create New Project</h2>
                <input type="text" placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                <textarea placeholder="Project Description" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}></textarea>
                <input type='text' placeholder='Project Owner' value={projectOwner} onChange={(e) => setProjectOwner(e.target.value)}></input>
                <button onClick={handleCreateProject}>Create Project</button>
            </div>
        </div>
    );
};

export default ProjectModal;
