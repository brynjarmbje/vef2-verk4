import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  return (
    <header>
    <nav>
        <h2>Skóli skarpa fólksins</h2>
      <ul>
        <li><Link to="/">Deildir</Link></li>
        <li><Link to="/departments/:slug/create-course">Áfanga breytingar</Link></li>
        {/* Add other navigation links as needed */}
      </ul>
    </nav>
    </header>
  );
}

export default NavigationBar;