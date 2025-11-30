import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('citizen');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
        role,
      });

      if (response.data.success) {
        login(response.data);
        navigate('/');
      }
    } catch (err) {
      setError('Invalid credentials or role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Constitution Connect</h1>
        <p className="subtitle">Educational Platform on Indian Constitution</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="citizen">Citizen</option>
              <option value="expert">Legal Expert</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>


        <div style={{marginTop: '20px', textAlign: 'center', borderTop: '1px solid #e0e0e0', paddingTop: '20px'}}>
          <p style={{margin: 0, color: '#666', fontSize: '14px'}}>
            Don't have an account?{' '}
            <Link to="/signup" style={{color: '#FF9933', fontWeight: 'bold', textDecoration: 'none'}}>
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
