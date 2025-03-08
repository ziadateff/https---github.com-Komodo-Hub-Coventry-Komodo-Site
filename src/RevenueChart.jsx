import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  // Mock data for revenue generated over time
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // X-axis labels
    datasets: [
      {
        label: 'Revenue (in USD)', // Legend label
        data: [5000, 7000, 10000, 8000, 12000, 9000, 15000], // Y-axis data
        borderColor: '#007bff', // Line color
        backgroundColor: 'rgba(0, 123, 255, 0.1)', // Fill color under the line
        borderWidth: 2, // Line thickness
        pointRadius: 5, // Point size
        pointBackgroundColor: '#007bff', // Point color
        tension: 0.4, // Smoothness of the line
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
        text: 'Monthly Revenue Generated', // Chart title
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis from 0
        grid: {
          color: '#eee', // Grid line color
        },
      },
      x: {
        grid: {
          color: '#eee', // Grid line color
        },
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}> {/* Set a fixed height for the chart container */}
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueChart;