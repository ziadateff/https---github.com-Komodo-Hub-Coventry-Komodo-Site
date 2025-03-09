import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const UserTypesPieChart = () => {
  const [userTypes, setUserTypes] = useState({
    schools: 0,
    communities: 0,
    individualUsers: 0,
  });

  // Fetch user type data from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/user-types')
      .then((response) => response.json())
      .then((data) => {
        console.log('User Types Data:', data); // Debugging
        setUserTypes(data);
      })
      .catch((error) => console.error('Error fetching user types:', error));
  }, []);

  // Data for the pie chart
  const data = {
    labels: ['Schools', 'Communities', 'Individual Users'],
    datasets: [
      {
        label: ' ',
        data: [userTypes.schools, userTypes.communities, userTypes.individualUsers],
        backgroundColor: [
          '#007bff', // Blue for Schools
          '#28a745', // Green for Communities
          '#dc3545', // Red for Individual Users
        ],
        borderColor: [
          '#ffffff', // White border
          '#ffffff',
          '#ffffff',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize freely
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      title: {
        display: true,
        text: 'User Types on Komodohub', // Chart title
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}> {/* Set a fixed height for the chart container */}
      <Pie data={data} options={options} />
    </div>
  );
};

export default UserTypesPieChart;