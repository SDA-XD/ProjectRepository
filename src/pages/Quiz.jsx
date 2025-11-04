import React, { useState } from 'react';
import '../styles/Account.css';

function Quiz() {
  // 5 quiz questions
  const questions = [
    {
      question: 'What is the supreme law of India?',
      options: ['The President', 'The Parliament', 'The Constitution', 'The Supreme Court'],
      correct: 2
    },
    {
      question: 'Which part of the Constitution deals with Fundamental Rights?',
      options: ['Part I', 'Part II', 'Part III', 'Part IV'],
      correct: 2
    },
    {
      question: 'When did the Indian Constitution come into effect?',
      options: ['15th August 1947', '26th January 1950', '2nd October 1948', '1st January 1951'],
      correct: 1
    },
    {
      question: 'Who is known as the Father of the Indian Constitution?',
      options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'B. R. Ambedkar', 'Sardar Patel'],
      correct: 2
    },
    {
      question: 'How many Fundamental Duties are mentioned in the Constitution?',
      options: ['10', '11', '12', '9'],
      correct: 1
    }
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (optionIndex) => {
    if (!submitted) {
      const newAnswers = [...answers];
      newAnswers[current] = optionIndex;
      setAnswers(newAnswers);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleSubmit = () => {
    let result = 0;
    answers.forEach((ans, index) => {
      if (ans === questions[index].correct) result++;
    });
    setScore(result);
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setAnswers(Array(5).fill(null));
    setCurrent(0);
    setSubmitted(false);
    setScore(0);
  };

  const q = questions[current];

  return (
    <div className="account-container">
      <h1>🧠 Constitution Quiz</h1>

      {!submitted ? (
        <>
          <h2>{`Question ${current + 1} of ${questions.length}`}</h2>
          <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{q.question}</p>

          <div className="quiz-options">
            {q.options.map((opt, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`quiz-option ${answers[current] === index ? 'selected' : ''}`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="quiz-nav">
            <button onClick={handlePrev} disabled={current === 0}>Previous</button>
            {current < questions.length - 1 ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <button onClick={handleSubmit}>Submit Quiz</button>
            )}
          </div>
        </>
      ) : (
        <div className="quiz-result">
          <h2>Your Score: {score} / {questions.length}</h2>
          <p>
            {score === 5 ? '🌟 Excellent!' :
             score >= 3 ? '👍 Good Job!' :
             '😅 Keep Learning!'}
          </p>
          <button onClick={resetQuiz}>Try Again</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
