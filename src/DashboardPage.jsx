import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Masonry from 'react-masonry-css';
import SortableWidget from './SortableWidget';
import './DashboardPage.css';
import RevenueChart from './RevenueChart.jsx';
import UserTypesPieChart from './UserTypesPieChart.jsx';

const DashboardPage = () => {
  const [schoolsCount, setSchoolsCount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [communities, setCommunities] = useState([]);
  const [schools, setSchools] = useState([]);
  const [totalCommunities, setTotalCommunities] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  // Widgets state
  const [widgets, setWidgets] = useState([
    { id: 'schools-count', content: 'Schools Count', size: 'small' },
    { id: 'revenue-chart', content: 'Revenue Chart', size: 'medium' },
    { id: 'total-students', content: 'Total Students', size: 'small' },
    { id: 'communities-list', content: 'Communities List', size: 'large' },
    { id: 'user-types-pie', content: 'User Types Pie Chart', size: 'medium' },
    { id: 'schools-list', content: 'Schools List', size: 'large' },
    { id: 'total-communities', content: 'Total Communities', size: 'small' },
    { id: 'total-users', content: 'Total Users', size: 'small' },
  ]);

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
      .then((data) => {
        console.log('Communities Data:', data); // Debugging
        setCommunities(data);
      })
      .catch((error) => console.error('Error fetching communities:', error));
  }, []);

  // Fetch the total number of communities
  useEffect(() => {
    fetch('http://localhost:5000/api/communities/count')
      .then((response) => response.json())
      .then((data) => setTotalCommunities(data.count))
      .catch((error) => console.error('Error fetching communities count:', error));
  }, []);

  // Fetch the list of schools
  useEffect(() => {
    fetch('http://localhost:5000/api/schools')
      .then((response) => response.json())
      .then((data) => {
        console.log('Schools Data:', data); // Debugging
        setSchools(data);
      })
      .catch((error) => console.error('Error fetching schools:', error));
  }, []);

  // Fetch the total number of users
  useEffect(() => {
    fetch('http://localhost:5000/api/users/count')
      .then((response) => response.json())
      .then((data) => {
        console.log('Total Users Data:', data); // Debugging
        setTotalUsers(data.count);
      })
      .catch((error) => console.error('Error fetching total users:', error));
  }, []);

  // Sensors for drag-and-drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag-and-drop
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setWidgets((widgets) => {
        const oldIndex = widgets.findIndex((widget) => widget.id === active.id);
        const newIndex = widgets.findIndex((widget) => widget.id === over.id);

        return arrayMove(widgets, oldIndex, newIndex);
      });
    }
  };

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="dashboard">
      <h1 className="header">Dashboard Page</h1>
      <p className="welcome-text">Welcome to the Dashboard! Here you can view your progress and statistics.</p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="widgets-container"
            columnClassName="widgets-column"
          >
            {widgets.map((widget) => (
              <SortableWidget key={widget.id} id={widget.id}>
                <div className={`widget ${widget.size}`}>
                  {/* Drag handle */}
                  <div className="drag-handle">☰</div>

                  {/* Widget content */}
                  {widget.id === 'schools-count' && (
                    <>
                      <h2 className="widget-title">Schools Subscribed to Komodohub</h2>
                      <div className="widget-content">
                        <p className="widget-count">{schoolsCount}</p>
                        <p className="widget-subtext">Total Schools</p>
                      </div>
                    </>
                  )}
                  {widget.id === 'revenue-chart' && (
                    <>
                      <h2 className="widget-title">Revenue Generated</h2>
                      <RevenueChart />
                    </>
                  )}
                  {widget.id === 'total-students' && (
                    <>
                      <h2 className="widget-title">Total Students in Komodohub</h2>
                      <div className="widget-content">
                        <p className="widget-count">{totalStudents}</p>
                        <p className="widget-subtext">Students</p>
                      </div>
                    </>
                  )}
                  {widget.id === 'communities-list' && (
                    <>
                      <h2 className="widget-title">Communities Using Komodohub</h2>
                      <ul className="community-list">
                        {communities.map((community) => (
                          <li key={community.id} className="community-item">
                            {community.name}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {widget.id === 'user-types-pie' && (
                    <>
                      <h2 className="widget-title">User Types on Komodohub</h2>
                      <UserTypesPieChart />
                    </>
                  )}
                  {widget.id === 'schools-list' && (
                    <>
                      <h2 className="widget-title">Schools Using Komodohub</h2>
                      <ul className="school-list">
                        {schools.map((school) => (
                          <li key={school.id} className="school-item">
                            {school.name}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {widget.id === 'total-communities' && (
                    <>
                      <h2 className="widget-title">Total Communities in Komodohub</h2>
                      <div className="widget-content">
                        <p className="widget-count">{totalCommunities}</p>
                        <p className="widget-subtext">Communities</p>
                      </div>
                    </>
                  )}
                  {widget.id === 'total-users' && (
                    <>
                      <h2 className="widget-title">Total Users in Komodohub</h2>
                      <div className="widget-content">
                        <p className="widget-count">{totalUsers}</p>
                        <p className="widget-subtext">Users</p>
                      </div>
                    </>
                  )}
                </div>
              </SortableWidget>
            ))}
          </Masonry>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DashboardPage;