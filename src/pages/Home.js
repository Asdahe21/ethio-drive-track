import React from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";

// --- START: HowItWorks Component Definition (Combined JS and CSS) ---

const HowItWorks = () => {
  // --- CSS Styles defined as a JavaScript object ---
  const styles = {
    section: {
      backgroundColor: '#ffffff', // Pure white background
      padding: '60px 20px',
      textAlign: 'center',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    title: {
      fontSize: '3em',
      color: '#333',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '1.1em',
      color: '#666',
      marginBottom: '50px',
    },
    stepsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      justifyContent: 'center',
    },
    stepCard: {
      backgroundColor: '#f7f7f7',
      padding: '30px',
      borderRadius: '10px',
      textAlign: 'left',
      position: 'relative',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    stepNumber: (number) => ({
      position: 'absolute',
      top: '30px',
      left: '30px',
      fontSize: '4em',
      fontWeight: 'bold',
      color: 'rgba(0, 123, 255, 0.1)',
      zIndex: 0,
      lineHeight: 1,
    }),
    stepTitle: {
      fontSize: '1.5em',
      color: '#333',
      marginTop: '60px',
      marginBottom: '15px',
      position: 'relative',
      zIndex: 1,
    },
    stepText: {
      fontSize: '1em',
      color: '#555',
      lineHeight: 1.6,
      marginBottom: '20px',
      position: 'relative',
      zIndex: 1,
    },
    stepStrong: {
      color: '#333',
    },
    learnMoreLink: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: 500,
      marginTop: 'auto',
      display: 'inline-block',
      position: 'relative',
      zIndex: 1,
    },
  };
  // --------------------------------------------------

  // Helper component for the step card (optional, but cleaner)
  const StepCard = ({ number, title, text, linkText, linkHref }) => (
    <div style={styles.stepCard}>
      <div style={styles.stepNumber(number)}>{number}</div>
      <h3 style={styles.stepTitle}>{title}</h3>
      <p style={styles.stepText}>
        {/* Simple string manipulation to bold the key phrase */}
        {text.split('**').map((part, index) => 
          index % 2 === 1 ? <strong key={index} style={styles.stepStrong}>{part}</strong> : part
        )}
      </p>
      <a href={linkHref} style={styles.learnMoreLink}>{linkText}</a>
    </div>
  );

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>How it works</h2>
        <p style={styles.subtitle}>
          Learn what we check, how fast it happens, and what you get in return:
        </p>

        <div style={styles.stepsGrid}>
          <StepCard 
            number={1}
            title="Enter the car's VIN number"
            text="Every car has a unique **17-digit VIN code** that lets us track its entire history. You'll find it in the V5C (logbook) or other registration documents, or directly on the vehicle."
            linkText="Where can I find the VIN?"
          />
          
          <StepCard 
            number={2}
            title="We'll check verified data Nationwide"
            text="We'll scan 50+ data sources from around the whole country – including insurance, police, and registration data – to reveal any hidden problems."
            linkText="Where does the data come from?"
          />

          <StepCard 
            number={3}
            title="Pay and unlock your full vehicle history report"
            text="After payment, generate reports to see the car's history – your full report will be **ready in just 55 seconds**."
            linkText="How can I buy and use carVertical reports?"
          />

          <StepCard 
            number={4}
            title="Let data guide your decision"
            text="Use the car history report to decide whether to buy the car, negotiate a better price, or keep looking."
            linkText="View sample report"
            linkHref="/samplereport"
          />
        </div>
      </div>
    </section>
  );
};

// --- END: HowItWorks Component Definition ---

function Home({ isLoggedIn }) {
  return (
    <div>
      <Hero isLoggedIn={isLoggedIn} />
      {/* Integrating the new component here */}
      <HowItWorks />
    </div>
  );
}

export default Home;
