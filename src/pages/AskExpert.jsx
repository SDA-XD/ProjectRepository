import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Account.css';

function AskExpert() {
  const { user } = useAuth();
  const [question, setQuestion] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/questions', {
        name: user.name,
        email: user.email,
        question
      });

      if (res.data.success) {
        setSuccess('✅ Your question has been submitted to the experts!');
        setQuestion('');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="account-container">
      <h1>Ask a Legal Expert</h1>
      <p>Submit your question below. Our legal experts will answer soon.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows="4"
          placeholder="Type your question here..."
          required
          style={{ width: '100%', padding: '10px', borderRadius: '8px' }}
        />
        <button type="submit" className="btn-save" style={{ marginTop: '10px' }}>
          Submit Question
        </button>
      </form>

      {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
    </div>
  );
}

export default AskExpert;
