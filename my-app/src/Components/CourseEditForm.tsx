import React, { useState } from 'react';
import { Course, ALLOWED_SEMESTERS } from '../types'; // Ensure this is imported correctly

interface CourseEditFormProps {
  course: Course;
  onSubmit: (updatedCourse: Course) => void;
}

const CourseEditForm: React.FC<CourseEditFormProps> = ({ course, onSubmit }) => {
  const [updatedCourse, setUpdatedCourse] = useState<Course>(course);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(updatedCourse);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <div>
        <label htmlFor="courseId">Course ID:</label>
        <input
          type="text"
          id="courseId"
          name="courseId"
          value={updatedCourse.courseId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={updatedCourse.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="units">Units:</label>
        <input
          type="number"
          id="units"
          name="units"
          value={updatedCourse.units}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="semester">Semester:</label>
        <select
          id="semester"
          name="semester"
          value={updatedCourse.semester}
          onChange={handleChange}
          required
        >
          <option value="">Select Semester</option>
          {ALLOWED_SEMESTERS.map((sem) => (
            <option key={sem} value={sem}>{sem}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="level">Level:</label>
        <input
          type="text"
          id="level"
          name="level"
          value={updatedCourse.level || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={updatedCourse.url || ''}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default CourseEditForm;