import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Account.css';

function Account() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put('http://localhost:5000/api/user/update', {
        currentEmail: user.email,
        newEmail: formData.email,
        name: formData.name
      });
      
      if (response.data.success) {
        updateUser({
          name: formData.name,
          email: formData.email
        });
        
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully!');
        
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Update error:', error);
      setSuccessMessage('');
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email
    });
    setIsEditing(false);
  };

  return (
    <div className="account-container">
      <div className="account-header">
        <h1>My Account</h1>
        <p>Manage your profile and account settings</p>
      </div>

      {successMessage && (
        <div className="success-message">
          ✓ {successMessage}
        </div>
      )}

      <div className="account-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {(isEditing ? formData.name : user.name).charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="profile-info">
            <h2>{isEditing ? formData.name : user.name}</h2>
            <span className="role-badge">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
          </div>

          <button 
            className="btn-edit"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <div className="edit-form-card">
            <h3>Edit Profile Information</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save">Save Changes</button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="info-cards">
            <div className="info-card">
              <h3>📧 Email Address</h3>
              <p>{user.email}</p>
            </div>

            <div className="info-card">
              <h3>👤 Account Type</h3>
              <p>{user.role === 'admin' ? 'Administrator' : user.role === 'expert' ? 'Legal Expert' : 'Citizen'}</p>
            </div>

            <div className="info-card">
              <h3>🔐 Account Status</h3>
              <p className="status-active">Active</p>
            </div>

            <div className="info-card">
              <h3>📅 Member Since</h3>
              <p>October 2025</p>
            </div>
          </div>
        )}

        <div className="permissions-section">
          <h3>Account Permissions</h3>
          <div className="permissions-list">
            {user.role === 'admin' && (
              <>
                <div className="permission-item">
                  <span className="permission-icon">✓</span>
                  <span>Manage platform content</span>
                </div>
                <div className="permission-item">
                  <span className="permission-icon">✓</span>
                  <span>Oversee user roles</span>
                </div>
                <div className="permission-item">
                  <span className="permission-icon">✓</span>
                  <span>Access admin dashboard</span>
                </div>
                <div className="permission-item">
                  <span className="permission-icon">✓</span>
                  <span>Update constitutional content</span>
                </div>
              </>
            )}

            {user.role === 'expert' && (
              <>
                <div className="permission-item">
                  <span className="permission-icon">✓</span>
                  <span>Provide legal insights</span>
                </div>
                <div className="permission-item">
                  <span className="permission-icon">✓</span>
                  <span>Update educational content</span>
                </div>
                <div className="permission-item">
                  <span className="permission-icon">✓</span>
                  <span>Access expert dashboard</span>
                </div>
                <div className="permission-item">
                  <span className="permission-icon">✓</span>
                  <span>Answer citizen queries</span>
                </div>
              </>
            )}

            {user.role === 'citizen' && (
              <>
                <div className="permission-item">
                  <span className="permission-icon">✓</span>
                  <span>Browse constitutional content</span>
                </div>
                <div className="permission-item">
                  <span className="permission-icon">✓</span>
                  <span>Participate in discussions</span>
                </div>
                <div className="permission-item">
                  <span className="permission-icon">✓</span>
                  <span>Access educational resources</span>
                </div>
                <div className="permission-item">
                  <span className="permission-icon">✓</span>
                  <span>Ask questions to experts</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
