import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import ModulesPage from './ModulesPage';
import MathsPage from './Modules/pages/MathsPage';
import GeographyPage from './Modules/pages/GeographyPage';
import EnglishPage from './Modules/pages/EnglishPage';
import HistoryPage from './Modules/pages/HistoryPage';
import SciencePage from './Modules/pages/SciencePage';
import CSPage from './Modules/pages/CSPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<MainLayout><ModulesPage /></MainLayout>} />
        {/* Module Pages */}
        <Route path="/maths" element={<MainLayout><MathsPage /></MainLayout>} />
        <Route path="/geography" element={<MainLayout><GeographyPage /></MainLayout>} />
        <Route path="/english" element={<MainLayout><EnglishPage /></MainLayout>} />
        <Route path="/history" element={<MainLayout><HistoryPage /></MainLayout>} />
        <Route path="/science" element={<MainLayout><SciencePage /></MainLayout>} />
        <Route path="/computer-basics" element={<MainLayout><CSPage /></MainLayout>} />

        {/* Fallback Route */}
        <Route path="*" element={<MainLayout><ModulesPage /></MainLayout>} />
      </Routes>
    </Router>
  );
};

export default App;