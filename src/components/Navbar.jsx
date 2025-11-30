import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Constitution Connect
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/framework" className="nav-link">Framework</Link>
          </li>
          <li className="nav-item">
            <Link to="/rights" className="nav-link">Fundamental Rights</Link>
          </li>
          <li className="nav-item">
            <Link to="/duties" className="nav-link">Fundamental Duties</Link>
          </li>

        
          {(user.role === 'admin' || user.role === 'expert') && (
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
          )}

          {user.role === 'admin' && (
            <li className="nav-item">
              <Link to="/user-stats" className="nav-link">View User Stats</Link>
            </li>
          )}

          {user.role === 'citizen' && (
            <li className="nav-item">
              <Link to="/quiz" className="nav-link">Quiz</Link>
            </li>
          )}

          {user.role === 'citizen' && (
            <li className="nav-item">
              <Link to="/ask-expert" className="nav-link">Ask Expert</Link>
            </li>
          )}

          {user.role === 'expert' && (
            <li className="nav-item">
              <Link to="/expert-dashboard" className="nav-link">Expert Dashboard</Link>
            </li>
          )}

          <li className="nav-item">
            <Link to="/account" className="nav-link">Account</Link>
          </li>
        </ul>

        <div className="nav-user">
          <span className="user-name">{user.name}</span>
          
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
