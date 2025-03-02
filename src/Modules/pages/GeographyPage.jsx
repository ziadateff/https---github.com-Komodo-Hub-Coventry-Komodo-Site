import React, { useState } from 'react';
import './MathsPage.css';

const GeographyPage = () => {
  const [expandedWeek, setExpandedWeek] = useState(null);

  const toggleWeek = (week) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  const studyMaterials = {
    week1: ['Lecture Slides 1', 'Practice Problems 1', 'Reading Material 1'],
    week2: ['Lecture Slides 2', 'Practice Problems 2', 'Reading Material 2'],
    week3: ['Lecture Slides 3', 'Practice Problems 3', 'Reading Material 3'],
    week4: ['Lecture Slides 4', 'Practice Problems 4', 'Reading Material 4'],
    week5: ['Lecture Slides 5', 'Practice Problems 5', 'Reading Material 5'],
  };

  return (
    <div className="geography-page">
      <h1>Science Module</h1>
      <p>Welcome to the Maths module! Here you'll find all the study materials for each week.</p>

      {/* Accordion for Weeks */}
      <div className="weeks-accordion">
        {[...Array(5).keys()].map((week) => (
          <div key={week + 1} className="week-section">
            <div
              className="week-header"
              onClick={() => toggleWeek(`week${week + 1}`)}
            >
              <h2>Week {week + 1}</h2>
              <span>{expandedWeek === `week${week + 1}` ? '▲' : '▼'}</span>
            </div>
            {expandedWeek === `week${week + 1}` && (
              <div className="week-content">
                <ul>
                  {studyMaterials[`week${week + 1}`].map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Container Layout */}
      <div className="container-layout">
        {/* Interactive Math Game Container */}
        <div className="interactive-game-container">
          <h2>🧮 Quick Math Game!</h2>
          <iframe
            title="2048 Game"
            src="https://3072.vercel.app/"
            style={{ border: 'none', borderRadius: '10px' }}
          />
        </div>

        {/* Announcements Container */}
        <div className="announcements-container">
          <h2>📢 Announcements</h2>
          <p>No new announcements at the moment.</p>
        </div>

        {/* Assignments Container */}
        <div className="assignments-container">
          <h2>📝 Assignments</h2>
          <p>No assignments due this week.</p>
        </div>
      </div>
    </div>
  );
};

export default GeographyPage;