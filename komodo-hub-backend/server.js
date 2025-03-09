const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Mock data for communities
const communities = [
  { id: 1, name: 'Jakarta Education Community' },
  { id: 2, name: 'Bandung Learning Network' },
  { id: 3, name: 'Surabaya Teachers Association' },
  { id: 4, name: 'Yogyakarta Student Forum' },
  { id: 5, name: 'Medan Science Enthusiasts' },
  { id: 6, name: 'Semarang Academic Circle' },
  { id: 7, name: 'Makassar Knowledge Hub' },
  { id: 8, name: 'Denpasar Creative Learning Group' },
  { id: 9, name: 'Palembang Educators Alliance' },
  { id: 10, name: 'Malang Innovation Network' },
];

// Mock data for schools
const schools = [
  { id: 1, name: 'Ujung Raya Primary School', location: 'Ujung Kulon', subscriptionDate: '2023-01-15' },
  { id: 2, name: 'Green Valley School', location: 'Jakarta', subscriptionDate: '2023-02-10' },
  { id: 3, name: 'Mountain View School', location: 'Bandung', subscriptionDate: '2023-03-05' },
  { id: 4, name: 'Sunrise Academy', location: 'Surabaya', subscriptionDate: '2023-04-12' },
  { id: 5, name: 'Harmony High School', location: 'Yogyakarta', subscriptionDate: '2023-05-20' },
  { id: 6, name: 'Bright Future School', location: 'Medan', subscriptionDate: '2023-06-18' },
  { id: 7, name: 'Pioneer Elementary', location: 'Semarang', subscriptionDate: '2023-07-22' },
  { id: 8, name: 'Ocean View School', location: 'Makassar', subscriptionDate: '2023-08-30' },
  { id: 9, name: 'Bali Green School', location: 'Denpasar', subscriptionDate: '2023-09-05' },
  { id: 10, name: 'Sumatra International School', location: 'Palembang', subscriptionDate: '2023-10-10' },
  { id: 11, name: 'Java Creative Academy', location: 'Malang', subscriptionDate: '2023-11-15' },
  { id: 12, name: 'Lombok Learning Center', location: 'Mataram', subscriptionDate: '2023-12-01' },
  { id: 13, name: 'Papua Highlands School', location: 'Jayapura', subscriptionDate: '2024-01-10' },
  { id: 14, name: 'Kalimantan Nature School', location: 'Balikpapan', subscriptionDate: '2024-02-14' },
  { id: 15, name: 'Sulawesi Tech Academy', location: 'Manado', subscriptionDate: '2024-03-20' },
];

// Mock data for total users
const totalUsers = 2500; // Example data (can be dynamic)

// Mock data for total students
const totalStudents = 2100;

// Mock data for user types
const userTypesData = {
  schools: 15, // Example data (can be dynamic)
  communities: 10, // Example data (can be dynamic)
  individualUsers: 5, // Example data (can be dynamic)
};

// API endpoint to get the total number of users
app.get('/api/users/count', (req, res) => {
  res.json({ count: totalUsers });
});

// API endpoint to get the number of schools subscribed
app.get('/api/schools/count', (req, res) => {
  res.json({ count: schools.length }); // Dynamically count schools
});

// API endpoint to get the total number of students
app.get('/api/students/count', (req, res) => {
  res.json({ count: totalStudents });
});

// API endpoint to get the list of communities
app.get('/api/communities', (req, res) => {
  res.json(communities);
});

// API endpoint to get the total number of communities
app.get('/api/communities/count', (req, res) => {
  res.json({ count: communities.length }); // Dynamically count communities
});

// API endpoint to get the list of schools
app.get('/api/schools', (req, res) => {
  res.json(schools);
});

// API endpoint to get user type proportions
app.get('/api/user-types', (req, res) => {
  res.json(userTypesData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});