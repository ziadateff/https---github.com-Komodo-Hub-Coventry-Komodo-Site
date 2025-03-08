import React, { useEffect, useState } from 'react';
import './DashboardPage.css'; // Import the CSS file
import RevenueChart from './RevenueChart.jsx'; // Import the RevenueChart component
import UserTypesPieChart from './UserTypesPieChart.jsx'; // Import the UserTypesPieChart component

const DashboardPage = () => {
  const [schoolsCount, setSchoolsCount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [communities, setCommunities] = useState([]);
  const [schools, setSchools] = useState([]);

  // Fetch the number of schools subscribed
  useEffect(() => {
    fetch('http://localhost:5000/api/schools/count')
      .then((response) => response.json())
      .then((data) => setSchoolsCount(data.count))
      .catch((error) => console.error('Error fetching schools count:', error));
  }, []);

  // Fetch the total number of students
  useEffect(() => {
    fetch('http://localhost:5000/api/students/count')
      .then((response) => response.json())
      .then((data) => setTotalStudents(data.count))
      .catch((error) => console.error('Error fetching students count:', error));
  }, []);

  // Fetch the list of communities
  useEffect(() => {
    fetch('http://localhost:5000/api/communities')
      .then((response) => response.json())
      .then((data) => setCommunities(data))
      .catch((error) => console.error('Error fetching communities:', error));
  }, []);

  // Fetch the list of schools
  useEffect(() => {
    fetch('http://localhost:5000/api/schools')
      .then((response) => response.json())
      .then((data) => setSchools(data))
      .catch((error) => console.error('Error fetching schools:', error));
  }, []);

  return (
    <div className="dashboard">
      <h1 className="header">Dashboard Page</h1>
      <p className="welcome-text">Welcome to the Dashboard! Here you can view your progress and statistics.</p>

      {/* Widgets container */}
      <div className="widgets-container">
        {/* Left column */}
        <div className="left-column">
          {/* Widget to display the number of schools subscribed */}
          <div className="widget">
            <h2 className="widget-title">Schools Subscribed to Komodohub</h2>
            <p className="widget-count">{schoolsCount}</p>
            <p className="widget-subtext">Total Schools</p>
          </div>

          {/* Widget to display the list of schools */}
          <div className="widget list-widget">
            <h2 className="widget-title">List of Schools</h2>
            <ul className="school-list">
              {schools.map((school) => (
                <li key={school.id} className="school-item">
                  {school.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="right-column">
          {/* Widget to display the revenue line graph */}
          <div className="widget revenue-widget">
            <h2 className="widget-title">Revenue Generated</h2>
            <RevenueChart />
          </div>

          {/* Widget to display the total number of students */}
          <div className="widget">
            <h2 className="widget-title">Total Students in Komodohub</h2>
            <p className="widget-count">{totalStudents}</p>
            <p className="widget-subtext">Students</p>
          </div>

          {/* Widget to display the list of communities */}
          <div className="widget list-widget">
            <h2 className="widget-title">Communities Using Komodohub</h2>
            <ul className="community-list">
              {communities.map((community) => (
                <li key={community.id} className="community-item">
                  {community.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Widget to display the user types pie chart */}
          <div className="widget">
            <h2 className="widget-title">User Types on Komodohub</h2>
            <UserTypesPieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;