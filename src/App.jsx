import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; // Import the new HomePage component
import MainLayout from './MainLayout'; // Keep the MainLayout for other pages
import ModulesPage from './ModulesPage';
import MessagesPage from './MessagesPage';
import DashboardPage from './DashboardPage';
import MathsPage from './Modules/pages/MathsPage';
import GeographyPage from './Modules/pages/GeographyPage';
import EnglishPage from './Modules/pages/EnglishPage';
import HistoryPage from './Modules/pages/HistoryPage';
import SciencePage from './Modules/pages/SciencePage';
import CSPage from './Modules/pages/CSPage';
import LogInPage from '/src/LogInPage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page (No MainLayout wrapper) */}
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LogInPage />} />

        {/* Other Pages (Wrapped in MainLayout) */}
        <Route path="/modules" element={<MainLayout><ModulesPage /></MainLayout>} />
        <Route path="/messages" element={<MainLayout><MessagesPage /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
        <Route path="/maths" element={<MainLayout><MathsPage /></MainLayout>} />
        <Route path="/geography" element={<MainLayout><GeographyPage /></MainLayout>} />
        <Route path="/english" element={<MainLayout><EnglishPage /></MainLayout>} />
        <Route path="/history" element={<MainLayout><HistoryPage /></MainLayout>} />
        <Route path="/science" element={<MainLayout><SciencePage /></MainLayout>} />
        <Route path="/computer-basics" element={<MainLayout><CSPage /></MainLayout>} />

        {/* Fallback Route (Redirect to HomePage) */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;