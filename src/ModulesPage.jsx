import React from 'react';
import { useNavigate } from 'react-router-dom'; /* Import useNavigate */
import './ModulesPage.css';
import HistoryImage from './assets/images/History.jpg'; 
import MathsImage from './assets/images/Maths.jpg';
import ScienceImage from './assets/images/Science.webp';
import GeographyImage from './assets/images/Geo.avif';
import EnglishImage from './assets/images/English.jpg';
import CSImage from './assets/images/CS.webp';

const ModulesPage = () => {
  const navigate = useNavigate(); /* Initializing useNavigate */

  const modules = [
    { id: 1, name: 'Maths', backgroundImage: `url(${MathsImage})`, path: '/maths' },
    { id: 2, name: 'Geography', backgroundImage: `url(${GeographyImage})`, path: '/geography' },
    { id: 3, name: 'English', backgroundImage: `url(${EnglishImage})`, path: '/english' },
    { id: 4, name: 'History', backgroundImage: `url(${HistoryImage})`, path: '/history' },
    { id: 5, name: 'Science', backgroundImage: `url(${ScienceImage})`, path: '/science' },
    { id: 6, name: 'Computer Basics', backgroundImage: `url(${CSImage})`, path: '/computer-basics' },
  ];

  return (
    <div className="modules-container">
      <h1 className="modules-title">Select A Module</h1>
      <div className="modules-grid">
        {modules.map((module) => (
          <div
            key={module.id}
            className="module-card"
            style={{ backgroundImage: module.backgroundImage }}
            onClick={() => navigate(module.path)} /* Navigate to the module's page */
          >
            <p className="module-name">{module.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesPage;