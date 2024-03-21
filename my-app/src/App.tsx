import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage'; // Ensure the path is CorreCt
import DepartmentCourses from './Pages/DepartmentCourses';
import CreateCourse from './Pages/CreateCourse';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/departments/:slug" element={<DepartmentCourses />} />
          <Route path="/departments/:slug/create-course" element={<CreateCourse />} /> 
          {/* Add other routes as needed */}
        </Routes>
    </Router>
  );
};

export default App;
