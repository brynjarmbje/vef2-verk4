import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Department } from '../types';
import NavigationBar from '../Components/Navigation';
import DepartmentForm from '../Components/DepartmentForm';
import DeleteDepartment from '../Components/DeleteDepartment';
import InlineEditDepartmentForm from '../Components/InlineEditDepartmentForm';


const API_BASE_URL = 'http://localhost:3000'; // Use your actual backend URL

const Homepage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [editingDepartmentId, setEditingDepartmentId] = useState<number | null>(null);


  const fetchDepartments = () => {
    axios.get(`${API_BASE_URL}/departments`)
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => console.error("There was an error!", error));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDepartmentDeleted = () => {
    // Refresh the list of departments after one is deleted
    fetchDepartments();
  };

  const handleDepartmentUpdated = () => {
    setEditingDepartmentId(null); // Close the edit form
    // Fetch departments again to refresh the list
    fetchDepartments();
  };

  return (
    <div>
      <NavigationBar />
      <h2>Deildir skólans</h2>
      <ul>
        {departments.map((department) => (
          <li key={department.id}>
            <Link to={`/departments/${department.slug}`}>{department.title}</Link>
            <button onClick={() => setEditingDepartmentId(department.id)}>Edit</button>
            {editingDepartmentId === department.id && (
              <InlineEditDepartmentForm
                department={department}
                onDepartmentUpdated={handleDepartmentUpdated}
              />
            )}
            <DeleteDepartment slug={department.slug} onDepartmentDeleted={handleDepartmentDeleted} />
          </li>
        ))}
      </ul>
      <DepartmentForm onDepartmentAdded={fetchDepartments} />
    </div>
  );
};

export default Homepage;