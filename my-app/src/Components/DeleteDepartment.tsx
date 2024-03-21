import React from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

interface DeleteDepartmentProps {
    slug: string;
    onDepartmentDeleted: () => void; // Add a callback for after successful deletion
  }
  
  const DeleteDepartment: React.FC<DeleteDepartmentProps> = ({ slug, onDepartmentDeleted }) => {
    const handleDelete = async () => {
      if (window.confirm('Are you sure you want to delete this department?')) {
        try {
          await axios.delete(`${API_BASE_URL}/departments/${slug}`);
          alert('Department deleted successfully.');
          onDepartmentDeleted(); // Call this to refresh the department list
        } catch (error) {
          console.error('Failed to delete department:', error);
          alert('Failed to delete department.');
        }
      }
    };
  
    return <button onClick={handleDelete}>Delete</button>;
  };

  export default DeleteDepartment;