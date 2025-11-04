import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Account.css';

function ExpertDashboard() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState('');

  if (user.role !== 'expert') {
    return <p className="error">Access denied. Experts only.</p>;
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/questions');
      if (res.data.success) setQuestions(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/questions/${id}`, { answer });
      if (res.data.success) {
        setQuestions(questions.map(q => q.id === id ? { ...q, answer } : q));
        setAnswer('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading questions...</p>;

  return (
    <div className="account-container">
      <h1>Expert Dashboard</h1>
      {questions.length === 0 ? (
        <p>No questions submitted yet.</p>
      ) : (
        questions.map((q) => (
          <div key={q.id} className="info-card" style={{ marginBottom: '1rem' }}>
            <h3>{q.name} asks:</h3>
            <p>{q.question}</p>
            <p><strong>Answer:</strong> {q.answer || 'Not answered yet'}</p>

            {!q.answer && (
              <>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  rows="2"
                  style={{ width: '100%', marginTop: '10px', padding: '8px' }}
                />
                <button
                  className="btn-save"
                  onClick={() => submitAnswer(q.id)}
                  style={{ marginTop: '8px' }}
                >
                  Submit Answer
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ExpertDashboard;
