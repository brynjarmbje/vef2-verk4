import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Use your actual backend URL

interface DepartmentFormProps {
    onDepartmentAdded: () => void;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ onDepartmentAdded }) => {
  const { slug } = useParams<{ slug?: string }>(); // Slug is optional for creation
  const [department, setDepartment] = useState({
    title: '',
    description: '',
  });
  const isNew = !slug; // Determine if this is a new department based on the presence of slug

  // Fetch department details if updating
  useEffect(() => {
    if (!isNew) {
      axios.get(`${API_BASE_URL}/departments/${slug}`)
        .then(response => setDepartment(response.data))
        .catch(error => console.error("Failed to fetch department details:", error));
    }
  }, [slug, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDepartment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      title: department.title,
      description: department.description,
    };
    try {
      if (isNew) {
        await axios.post(`${API_BASE_URL}/departments`, formData);
        alert('Department successfully created.');
      } else {
        await axios.patch(`${API_BASE_URL}/departments/${slug}`, formData);
        alert('Department successfully updated.');
      }
      onDepartmentAdded(); // Refresh the list in the parent component
    } catch (error) {
      console.error("Failed to create/update department:", error);
      alert('Failed to create/update department. Please try again.');
    }
  };

  return (
    <div>
      <h2>{isNew ? 'Búa til nýja' : 'Update'} deild</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={department.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={department.description} onChange={handleChange} />
        </div>
        <button type="submit">{isNew ? 'Búa til' : 'Update'} Deild</button>
      </form>
    </div>
  );
};

export default DepartmentForm;