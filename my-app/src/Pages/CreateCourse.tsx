import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ALLOWED_SEMESTERS, Course, Department, Semester } from '../types';
import NavigationBar from '../Components/Navigation';

const API_BASE_URL = 'http://localhost:3000';

interface CourseFormState extends Omit<Course, 'id' | 'units' | 'semester'> {
  units: string; // For form handling, units are a string until submission
  semester: Semester | ''; // Allow the semester to be temporarily empty for form validation
}

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [course, setCourse] = useState<CourseFormState>({
    courseId: '',
    title: '',
    units: '',
    semester: '', // Initially empty to force selection
    level: '',
    url: ''
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/departments`);
        setDepartments(response.data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const courseData = {
      ...course,
      units: parseFloat(course.units)
    };
  
    if (!selectedDepartment) {
      alert("Please select a department.");
      return;
    }
  
    try {
      await axios.post(`${API_BASE_URL}/departments/${selectedDepartment}/courses`, courseData);
      alert('Course successfully created.');
      navigate(`/departments/${selectedDepartment}`);
    } catch (error) {
      console.error("Failed to create course:", error);
      alert('Failed to create course. Please try again.');
    }
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <div>
      <NavigationBar />
      <h2>Búa til nýjan áfanga</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Department:</label>
          <select value={selectedDepartment} onChange={handleDepartmentChange} required>
            <option value="">Select a Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.slug}>
                {department.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Course ID:</label>
          <input type="text" name="courseId" value={course.courseId} onChange={handleChange} required />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={course.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Units:</label>
          <input type="number" name="units" value={course.units} onChange={handleChange} required />
        </div>
        
        <div>
          <label>Semester:</label>
          <select name="semester" value={course.semester} onChange={handleChange} required>
            <option value="">Select Semester</option>
            {ALLOWED_SEMESTERS.map(sem => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Level:</label>
          <input type="text" name="level" value={course.level} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateCourse;