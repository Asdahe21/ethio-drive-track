import React, { useState } from 'react';

// =========================================================
// 1. Placeholder for Illustration Asset
// ---------------------------------------------------------
// NOTE: Moved this definition to directly above HeroSection 
// to ensure the linter recognizes its scope within that component.
// =========================================================

// =========================================================
// 2. Component: HeroSection
// =========================================================
const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Make car deals you can be proud of</h1>
        <p className="subheading">
          A great car deal is one you'll love to remember.
        </p>
        <p className="text-body">
          Whether you're a first-time buyer or a seasoned seller, we'll give you the clarity 
          and confidence you need to move faster, avoid nasty surprises, and make all the 
          right calls.
        </p>
        <p className="text-body drivers-count">
          Why waste hours inspecting cars that don’t meet your standards? With carVertical, you can check everything you need online before you step out the door.
          See the reports, skip the red flags, and only inspect the cars that are actually worth your time.
        </p>
      </div>
      <div className="hero-illustration">
        {/* The variable CarDealIllustration is now successfully in scope */}
        <img 
          alt="Illustration of a yellow car and two characters shaking hands" 
        />
      </div>
    </section>
  );
};


// =========================================================
// 3. Component: CallToActionSection
// =========================================================
const CallToActionSection = () => {
  const [vin, setVin] = useState('');

  const handleReportClick = () => {
    console.log(`Checking VIN: ${vin}`);
    // In a real app: trigger API call or form submission
  };
  
  const handleNoVINClick = () => {
    console.log('Navigating to VIN search options.');
    // In a real app: navigate to a different form or page
  };

  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Get it right the first time</h2>
        <p>
          Get a report, see what you're getting into, and rest easy knowing you've nailed the deal.
        </p>
      </div>

      <div className="vin-form-container">
        <div className="vin-input-group">
          <input
            type="text"
            placeholder="Enter VIN"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            className="vin-input"
          />
          <button 
            onClick={handleReportClick} 
            className="report-button"
            disabled={!vin}
          >
            Get report
          </button>
        </div>
        <button onClick={handleNoVINClick} className="no-vin-button">
          I don't have a VIN &nbsp; ↓ 
        </button>
      </div>
    </section>
  );
};


// =========================================================
// 4. Main Component: CarVerticalLandingPage
// =========================================================
const WhyPage = () => {
  // Styles defined within the component for a single-file setup
  // NOTE: This style block should ideally be in a separate CSS file for production.
  const styles = `
    .landing-page {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      min-width: 320px;
    }
    
    /* === Hero Section Styles === */
    .hero-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background-color: white; 
    }
    
    .hero-content {
      max-width: 50%;
      padding-right: 40px; 
    }
    
    .hero-content h1 {
      font-size: 3.5rem;
      font-weight: 800; 
      line-height: 1.1;
      margin-bottom: 20px;
      color: #1a1a1a;
    }
    
    .subheading {
      font-size: 1.25rem;
      margin-bottom: 30px;
      color: #333;
    }
    
    .text-body {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 20px;
      color: #555;
    }
    
    .text-body strong {
      font-weight: bold;
    }

    .hero-illustration {
      max-width: 40%;
    }
    
    .hero-illustration img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    
    /* === CTA Section Styles === */
    .cta-section {
      background-color: #007bff; /* Bright blue color */
      color: white;
      padding: 50px 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .cta-content {
      max-width: 1200px;
      margin: 0 auto 30px;
    }
    
    .cta-content h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
      line-height: 1.2;
    }
    
    .cta-content p {
      font-size: 1.1rem;
      margin-bottom: 30px;
    }
    
    .vin-form-container {
        max-width: 600px;
        width: 100%;
    }
    
    .vin-input-group {
      display: flex;
      justify-content: center;
      background-color: white;
      padding: 5px;
      border-radius: 6px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .vin-input {
      flex-grow: 1;
      padding: 15px 20px;
      border: none;
      font-size: 1rem;
      outline: none;
      border-radius: 4px 0 0 4px; 
    }
    
    .report-button {
      background-color: #f7d000; /* Yellow button color */
      color: black;
      border: none;
      padding: 15px 30px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s;
      flex-shrink: 0; 
    }
    
    .report-button:hover {
      background-color: #e6b800;
    }

    .report-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .no-vin-button {
      background: none;
      border: 1px solid white; 
      color: white;
      font-size: 1rem;
      margin-top: 15px;
      cursor: pointer;
      padding: 10px 20px;
      border-radius: 4px;
      text-decoration: none;
      transition: background-color 0.3s;
    }

    .no-vin-button:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    /* === Responsive adjustments === */
    @media (max-width: 900px) {
      .hero-section {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      
      .hero-content {
        max-width: 100%;
        padding-right: 0;
        margin-bottom: 40px;
      }

      .hero-illustration {
        max-width: 80%;
      }
    }
  `;

  return (
    <div className="landing-page">
      {/* Injecting styles for a single-file demo */}
      <style>{styles}</style>
      
      <HeroSection />
      <CallToActionSection />
    </div>
  );
};

export default WhyPage;