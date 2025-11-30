import React from 'react';
import '../styles/ContentPage.css';

function Rights() {
  const rights = [
    {
      title: "Right to Equality (Articles 14-18)",
      description: "Equality before law, prohibition of discrimination on grounds of religion, race, caste, sex or place of birth, equality of opportunity in public employment, abolition of untouchability and titles."
    },
    {
      title: "Right to Freedom (Articles 19-22)",
      description: "Freedom of speech and expression, assembly, association, movement, residence, and profession. Protection in respect of conviction for offences."
    },
    {
      title: "Right against Exploitation (Articles 23-24)",
      description: "Prohibition of human trafficking and forced labor. Prohibition of employment of children in factories and hazardous employment."
    },
    {
      title: "Right to Freedom of Religion (Articles 25-28)",
      description: "Freedom of conscience and free profession, practice and propagation of religion. Freedom to manage religious affairs, freedom from taxation and attendance at religious instruction."
    },
    {
      title: "Cultural and Educational Rights (Articles 29-30)",
      description: "Protection of interests of minorities to conserve their language, script, and culture. Right of minorities to establish and administer educational institutions."
    },
    {
      title: "Right to Constitutional Remedies (Article 32)",
      description: "Right to move the Supreme Court for enforcement of Fundamental Rights. The Supreme Court can issue writs like Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto."
    }
  ];

  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Fundamental Rights</h1>
        <p>Rights guaranteed to all citizens under the Constitution of India</p>
      </div>

      <div className="content-sections">
        {rights.map((right, index) => (
          <section key={index} className="content-section">
            <h2> {right.title}</h2>
            <p>{right.description}</p>
          </section>
        ))}

        <section className="content-section highlight-box">
          <h2>💡 Important Note</h2>
          <p>
            Fundamental Rights are not absolute and reasonable restrictions can be imposed 
            on them by the state in the interest of sovereignty, integrity, security, public 
            order, decency, or morality.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Rights;
