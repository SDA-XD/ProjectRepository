import React from 'react';
import '../styles/ContentPage.css';

function Duties() {
  const duties = [
    "To abide by the Constitution and respect its ideals, institutions, the National Flag and the National Anthem",
    "To cherish and follow the noble ideals which inspired our national struggle for freedom",
    "To uphold and protect the sovereignty, unity and integrity of India",
    "To defend the country and render national service when called upon to do so",
    "To promote harmony and the spirit of common brotherhood amongst all the people of India transcending religious, linguistic and regional or sectional diversities",
    "To value and preserve the rich heritage of our composite culture",
    "To protect and improve the natural environment including forests, lakes, rivers and wildlife, and to have compassion for living creatures",
    "To develop the scientific temper, humanism and the spirit of inquiry and reform",
    "To safeguard public property and to abjure violence",
    "To strive towards excellence in all spheres of individual and collective activity",
    "To provide opportunities for education to children between the age of six and fourteen years (added by 86th Amendment Act, 2002)"
  ];

  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Fundamental Duties</h1>
        <p>Moral obligations of all citizens to help promote a spirit of patriotism and uphold the unity of India</p>
      </div>

      <div className="content-sections">
        <section className="content-section">
          <h2>📋 Article 51A - Fundamental Duties</h2>
          <p>
            It shall be the duty of every citizen of India:
          </p>
          
          <div className="duties-list">
            {duties.map((duty, index) => (
              <div key={index} className="duty-item">
                <span className="duty-number">{index + 1}</span>
                <p>{duty}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section highlight-box">
          <h2>💡 Historical Context</h2>
          <p>
            Fundamental Duties were added to the Constitution by the <strong>42nd Amendment Act, 1976</strong> on 
            the recommendations of the Swaran Singh Committee. Originally, there were 10 duties. The 11th duty 
            (regarding education of children) was added by the 86th Amendment in 2002.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Duties;
