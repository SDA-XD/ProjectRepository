import React from 'react';
import '../styles/ContentPage.css';

function Framework() {
  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Constitutional Framework of India</h1>
        <p>Understanding the structure and organization of the Indian Constitution</p>
      </div>

      <div className="content-sections">
        <section className="content-section">
          <h2>📜 Preamble</h2>
          <p>
            WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a 
            <strong> SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC</strong> and to secure to all its citizens:
          </p>
          <ul>
            <li>JUSTICE, social, economic and political</li>
            <li>LIBERTY of thought, expression, belief, faith and worship</li>
            <li>EQUALITY of status and of opportunity</li>
            <li>FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>🏛️ Union and its Territory</h2>
          <p>
            India, that is Bharat, shall be a Union of States. The territory of India comprises:
          </p>
          <ul>
            <li>The territories of the States</li>
            <li>The Union territories</li>
            <li>Such other territories as may be acquired</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>📖 Parts of the Constitution</h2>
          <p>
            The Constitution is divided into <strong>25 Parts</strong> containing <strong>448 Articles</strong> and <strong>12 Schedules</strong>.
          </p>
          <div className="highlight-box">
            <h3>Key Parts Include:</h3>
            <ul>
              <li><strong>Part III:</strong> Fundamental Rights</li>
              <li><strong>Part IV:</strong> Directive Principles of State Policy</li>
              <li><strong>Part IVA:</strong> Fundamental Duties</li>
              <li><strong>Part V:</strong> The Union</li>
              <li><strong>Part VI:</strong> The States</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Framework;
