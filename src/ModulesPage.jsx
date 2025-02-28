import React from 'react';
import './ModulesPage.css';

const ModulesPage = () => {
const modules = [
{ id: 1, name: 'Module 1', icon: '📚' },
{ id: 2, name: 'Module 2', icon: '🛠️' },
{ id: 3, name: 'Module 3', icon: '📊' },
{ id: 4, name: 'Module 4', icon: '⚙️' },
{ id: 5, name: 'Module 5', icon: '📖' },
{ id: 6, name: 'Module 6', icon: '📗' },
];

return (
<div className="modules-container">
<h1 className="modules-title">Select a Module</h1>
<div className="modules-grid">
{modules.map((module) => (
<div
key={module.id}
className="module-card"
onClick={() => alert(`Navigating to ${module.name}`)}
>
<span className="module-icon">{module.icon}</span>
<p className="module-name">{module.name}</p>
</div>
))}
</div>
</div>
);
};

export default ModulesPage;
