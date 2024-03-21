import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Department, Course } from '../types'; // Adjust the import path as needed
import NavigationBar from '../Components/Navigation'; // If you're using a navigation bar across pages
import CourseEditForm from '../Components/CourseEditForm';

const API_BASE_URL = 'http://localhost:3000'; // Use your actual backend URL

const DepartmentCourses: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [department, setDepartment] = useState<Department | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null); // State to track editing course

  const fetchCourses = () => {
    axios.get(`${API_BASE_URL}/departments/${slug}/courses`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => console.error("There was an error!", error));
  };

  useEffect(() => {
    if (slug) {
      // Fetch department details
      axios.get(`${API_BASE_URL}/departments/${slug}`)
        .then(response => {
          setDepartment(response.data);
        })
        .catch(error => console.error("Failed to fetch department details:", error));
      
      // Fetch courses for the department
      axios.get(`${API_BASE_URL}/departments/${slug}/courses`)
        .then(response => {
          setCourses(response.data);
        })
        .catch(error => console.error("Failed to fetch courses:", error));
    }
  }, [slug]);

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`${API_BASE_URL}/departments/${slug}/courses/${courseId}`);
        alert('Course successfully deleted.');
        // Convert courseId to a number for the comparison
        setCourses(courses.filter(course => course.id !== Number(courseId)));
        fetchCourses();
      } catch (error) {
        console.error('Failed to delete course:', error);
        alert('Failed to delete course. Please try again.');
      }
    }
  };

  const handleUpdateCourse = async (courseId: number, updatedCourseData: Course) => {
    try {
      await axios.patch(`${API_BASE_URL}/departments/${slug}/courses/${courseId}`, updatedCourseData);
      alert('Course successfully updated.');
      setEditingCourseId(null); // Reset editing state
      // Re-fetch courses to reflect updates
      fetchCourses();
    } catch (error) {
      console.error('Failed to update course:', error);
      alert('Failed to update course. Please try again.');
    }
  };

  if (!department) return <div>Loading department...</div>;

  return (
    <div>
      <NavigationBar />
      <h1>{department.title}</h1>
      <p>{department.description || 'No description available.'}</p>
      <h2>Áfangar</h2>
      {courses.length > 0 ? (
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              {course.title} - {course.units} einingar
              <button onClick={() => setEditingCourseId(course.id)}>Edit</button>
              <button onClick={() => handleDeleteCourse(course.courseId)}>Delete</button>
              {editingCourseId === course.id && (
                // Inline form for editing the course
                // Pass handleUpdateCourse as a prop to this component/form
                <CourseEditForm course={course} onSubmit={updatedCourse => handleUpdateCourse(course.id, updatedCourse)} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Engir áfangar í boði í þessari deild.</p>
      )}
    </div>
  );
};

export default DepartmentCourses;