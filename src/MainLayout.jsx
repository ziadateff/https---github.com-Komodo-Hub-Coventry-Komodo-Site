import React from 'react';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Avatar/Profile Picture */}
        <div className="avatar-container">
          <div className="avatar">Z</div>
        </div>

        {/* Feature Icons */}
        <nav className="nav-links">
          <a href="#messages" className="nav-item">💬</a> {/* Messages Tab */}
          <a href="#modules" className="nav-item">📚</a> {/* Modules Tab */}
        </nav>

        {/* Help Icon at the Bottom maybe for FAQs or smth idk */}
        <div className="bottom-icon">
          <a href="#help" className="nav-item">❓</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">{children}</div>
    </div>
  );
};

export default MainLayout;
