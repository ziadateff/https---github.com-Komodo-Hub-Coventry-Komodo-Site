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
  // Mock data for revenue and expenses over time
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // X-axis labels
    datasets: [
      {
        label: 'Revenue (in USD)', // Legend label for revenue
        data: [5000, 7000, 10000, 8000, 12000, 9000, 15000], // Revenue data
        borderColor: '#007bff', // Line color for revenue
        backgroundColor: 'rgba(0, 123, 255, 0.1)', // Fill color under the revenue line
        borderWidth: 2, // Line thickness
        pointRadius: 5, // Point size
        pointBackgroundColor: '#007bff', // Point color for revenue
        tension: 0.4, // Smoothness of the line
      },
      {
        label: 'Expenses (in USD)', // Legend label for expenses
        data: [8000, 4000, 6000, 13000, 7000, 5500, 8000], // Expenses data
        borderColor: '#dc3545', // Line color for expenses
        backgroundColor: 'rgba(220, 53, 69, 0.1)', // Fill color under the expenses line
        borderWidth: 2, // Line thickness
        pointRadius: 5, // Point size
        pointBackgroundColor: '#dc3545', // Point color for expenses
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
        text: 'Monthly Revenue and Expenses', // Chart title
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis from 0
        grid: {
          color: '#eee', // Grid line color
        },
        title: {
          display: true,
          text: 'Amount (in USD)', // Y-axis label
        },
      },
      x: {
        grid: {
          color: '#eee', // Grid line color
        },
        title: {
          display: true,
          text: 'Month', // X-axis label
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