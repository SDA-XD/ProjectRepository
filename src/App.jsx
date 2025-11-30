import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Framework from './pages/Framework';
import Rights from './pages/Rights';
import Duties from './pages/Duties';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Quiz from './pages/Quiz';
import AskExpert from './pages/AskExpert';
import ExpertDashboard from './pages/ExpertDashboard';
import UserStats from './pages/UserStats';  
import './index.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '20px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="App">
      {user && <Navbar />}

      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <LoginPage />} 
        />
        <Route 
          path="/signup" 
          element={user ? <Navigate to="/" /> : <SignupPage />} 
        />

        <Route 
          path="/" 
          element={user ? <Home /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/framework" 
          element={user ? <Framework /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/rights" 
          element={user ? <Rights /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/duties" 
          element={user ? <Duties /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/account" 
          element={user ? <Account /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/quiz" 
          element={user ? <Quiz /> : <Navigate to="/login" />} 
        />
        <Route
          path="/ask-expert"
          element={user ? <AskExpert /> : <Navigate to="/login" />}
        />
        <Route
          path="/expert-dashboard"
          element={user ? <ExpertDashboard /> : <Navigate to="/login" />}
        />

        <Route 
          path="/user-stats" 
          element={user && user.role === 'admin' ? <UserStats /> : <Navigate to="/" />} 
        />
      </Routes>
    </div>
  );
}

export default App;
