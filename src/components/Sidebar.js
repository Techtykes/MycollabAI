// Sidebar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sidebar = ({ onNewFolderClick, onFolderClick }) => {
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        // Fetch folder data from backend API
        axios.get('http://localhost:5000/api/folders')
            .then(response => {
                setFolders(response.data); // Update state with fetched folder data
            })
            .catch(error => {
                console.error('Error fetching folder data:', error);
            });
    }, []); // Run this effect only once when the component mounts

    const handleFolderClick = (folderId, folderName) => {
        // Call the onFolderClick callback with the selected folder name
        onFolderClick(folderId, folderName);
        console.log('Folder clicked:', folderId, folderName);
    };

    return (
        <div className="sidebar">
            <button className="new-folder-button" onClick={onNewFolderClick}>New Folder</button>
            <input type="text" className="search-bar" placeholder="Search..." />
            <div className="divider"></div>
            <ul className="folder-list">
                {folders.map(folder => (
                    <React.Fragment key={folder._id}>
                        <li onClick={() => handleFolderClick(folder._id, folder.name)}>{folder.name}</li>
                        <div className="folder-divider"></div>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
