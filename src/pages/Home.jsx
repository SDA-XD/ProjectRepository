import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Constitution Connect</h1>
        <p className="welcome-message">Hello, {user.name}!</p>
        <p className="subtitle">
          Learn about the Indian Constitution, its framework, fundamental rights, and duties of citizens.
        </p>
      </div>

      <div className="content-grid">
        <Link to="/framework" className="content-card">
          <div className="card-icon"></div>
          <h2>Constitutional Framework</h2>
          <p>Understand the structure and organization of the Indian Constitution</p>
        </Link>

        <Link to="/rights" className="content-card">
          <div className="card-icon"></div>
          <h2>Fundamental Rights</h2>
          <p>Explore the rights guaranteed to all citizens under the Constitution</p>
        </Link>

        <Link to="/duties" className="content-card">
          <div className="card-icon"></div>
          <h2>Fundamental Duties</h2>
          <p>Learn about the duties expected from every citizen of India</p>
        </Link>

        {user.role === 'admin' && (
          <Link to="/dashboard" className="content-card admin-card">
            <div className="card-icon"></div>
            <h2>Admin Dashboard</h2>
            <p>Manage platform content and user roles</p>
          </Link>
        )}

        {user.role === 'expert' && (
          <Link to="/dashboard" className="content-card expert-card">
            <div className="card-icon"></div>
            <h2>Expert Dashboard</h2>
            <p>Provide legal insights and update content</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
