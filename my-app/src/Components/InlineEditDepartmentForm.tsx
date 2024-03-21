import React, { useState } from 'react';
import axios from 'axios';
import { Department } from '../types'; // Adjust the import path as needed

const API_BASE_URL = 'http://localhost:3000';

interface InlineEditDepartmentFormProps {
  department: Department;
  onDepartmentUpdated: () => void; // Callback to refresh the department list
}

const InlineEditDepartmentForm: React.FC<InlineEditDepartmentFormProps> = ({
  department: initialDepartment,
  onDepartmentUpdated,
}) => {
  const [department, setDepartment] = useState(initialDepartment);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_BASE_URL}/departments/${department.slug}`, department);
      alert('Department updated successfully.');
      onDepartmentUpdated(); // Refresh the department list on the homepage
    } catch (error) {
      console.error('Failed to update department:', error);
      alert('Failed to update department. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={department.title} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={department.description || ''} onChange={handleChange} />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default InlineEditDepartmentForm;