import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

function Dashboard() {
  const { user } = useAuth();

  const getDashboardContent = () => {
    switch (user.role) {
      case 'admin':
        return {
          title: 'Admin Dashboard',
          subtitle: 'Manage platform content and user roles',
          features: [
            'Oversee platform content',
            'Manage user roles and permissions',
            'Ensure accuracy of information',
            'Monitor platform activity',
            'Update constitutional content',
            'Review user contributions'
          ]
        };
      case 'expert':
        return {
          title: 'Legal Expert Dashboard',
          subtitle: 'Provide legal insights and guidance',
          features: [
            'Offer legal insights on constitutional matters',
            'Update constitutional content',
            'Provide expert guidance to citizens',
            'Review and validate legal information',
            'Contribute to educational resources',
            'Answer citizen queries'
          ]
        };
      case 'citizen':
        return {
          title: 'Citizen Dashboard',
          subtitle: 'Your learning and engagement hub',
          features: [
            'Explore constitutional content',
            'Participate in discussions',
            'Engage with educational resources',
            'Track your learning progress',
            'Ask questions to legal experts',
            'Save favorite articles and topics'
          ]
        };
      default:
        return {
          title: 'Dashboard',
          subtitle: 'Welcome',
          features: []
        };
    }
  };

  const content = getDashboardContent();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{content.title}</h1>
        <p>{content.subtitle}</p>
        <div className="user-info">
          <strong>Logged in as:</strong> {user.name} ({user.email})
        </div>
      </div>

      <div className="dashboard-content">
        <div className="features-card">
          <h2>Available Features</h2>
          <ul className="features-list">
            {content.features.map((feature, index) => (
              <li key={index}>
                <span className="feature-icon">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Articles</h3>
            <p className="stat-number">448</p>
          </div>
          <div className="stat-card">
            <h3>Parts</h3>
            <p className="stat-number">25</p>
          </div>
          <div className="stat-card">
            <h3>Schedules</h3>
            <p className="stat-number">12</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
