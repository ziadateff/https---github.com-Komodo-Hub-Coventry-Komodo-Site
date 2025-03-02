import React, { useState } from 'react';
import './MainLayout.css';
import 'primeicons/primeicons.css'; 

const MainLayout = ({ children }) => {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Avatar/Profile Picture */}
        <div className="avatar-container">
          <label htmlFor="avatar-upload" className="avatar-label">
            {avatar ? (
              <img src={avatar} alt="User Avatar" className="avatar-image" />
            ) : (
              <div className="avatar">K</div>
            )}
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Feature Icons */}
        <nav className="nav-links">
          <a href="#messages" className="nav-item">
            <i className="pi pi-comments" style={{ fontSize: '1.60rem' }}></i>
          </a>
          <a href="#modules" className="nav-item">
            <i className="pi pi-book" style={{ fontSize: '1.60rem' }}></i>
          </a>
        </nav>

        {/* Help Icon at the Bottom */}
        <div className="bottom-icon">
          <a href="#help" className="nav-item">
            <i className="pi pi-question" style={{ fontSize: '1.60rem' }}></i>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">{children}</div>
    </div>
  );
};

export default MainLayout;