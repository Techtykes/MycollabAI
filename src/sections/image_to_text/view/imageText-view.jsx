import axios from 'axios';
import React, { useState } from 'react';

// If you're using Context API to pass the fileId around components
const FileIdContext = React.createContext();

function ChatComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileId, setFileId] = useState(null); // Add state to store the fileId

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file to upload.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsUploading(false);

      // Check if the backend response contains the fileId and handle it
      if (response.data && response.data.fileId) {
        setFileId(response.data.fileId); // Store the fileId in state
        alert('PDF uploaded successfully. Ready for questions.');
      } else {
        alert('Failed to process PDF. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setIsUploading(false);
      alert('Error uploading PDF. Please try again.');
    }
  };

  return (
    <FileIdContext.Provider value={fileId}> {/* Provide the fileId to other components */}
      <div>
        <input type="file" onChange={handleFileChange} accept="application/pdf" disabled={isUploading} />
        <button type="button" onClick={handleFileUpload} disabled={isUploading || !selectedFile}>
          {isUploading ? 'Uploading...' : 'Upload PDF'}
        </button>
      </div>
    </FileIdContext.Provider>
  );
}

export default ChatComponent;
export { FileIdContext }; // Export the context for use in other components
