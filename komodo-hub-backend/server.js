const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Mock data for the number of schools subscribed
let schoolsCount = 150;

// Mock data for the total number of students
let totalStudents = 5000; // Example data

// Mock data for communities using Komodohub
const communities = [
  { id: 1, name: 'Jakarta Education Community' },
  { id: 2, name: 'Bandung Learning Network' },
  { id: 3, name: 'Surabaya Teachers Association' },
  { id: 4, name: 'Yogyakarta Student Forum' },
];

const schools = [
  { id: 1, name: 'Ujung Raya Primary School', location: 'Ujung Kulon', subscriptionDate: '2023-01-15' },
  { id: 2, name: 'Green Valley School', location: 'Jakarta', subscriptionDate: '2023-02-10' },
  { id: 3, name: 'Mountain View School', location: 'Bandung', subscriptionDate: '2023-03-05' },
  // Add more schools as needed
];

const communitiesCount = 50; // Example data
const individualUsersCount = 300; // Example data

// API endpoint to get user type proportions
app.get('/api/user-types', (req, res) => {
  res.json({
    schools: schoolsCount,
    communities: communitiesCount,
    individualUsers: individualUsersCount,
  });
});

// API endpoint to get the list of schools
app.get('/api/schools', (req, res) => {
  res.json(schools);
});

// API endpoint to get the number of schools subscribed
app.get('/api/schools/count', (req, res) => {
  res.json({ count: schoolsCount });
});

// API endpoint to get the total number of students
app.get('/api/students/count', (req, res) => {
  res.json({ count: totalStudents });
});

// API endpoint to get the list of communities
app.get('/api/communities', (req, res) => {
  res.json(communities);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});