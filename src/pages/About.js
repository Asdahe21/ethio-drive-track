import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from "../assets/bg.png"; 

const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <header className="about-header">
          <h1 align="center">About Ethio Drive Track</h1>
          <p className="subtitle" align="center">
            Bringing Transparency, Trust, and Confidence to Ethiopia's Vehicle Market
          </p>
        </header>

        <section className="story-section">
          <h2 align="center">The Problem We're Solving</h2>
          <p>
            The Ethiopian used vehicle market is vibrant and growing, yet buyers and sellers face persistent challenges due to <strong>information gaps and unreliable records</strong> from the sellers or brokers.<br></br>
            Important details - such as:- 
            <strong>
              <ol>
                <li>Accident history</li>
                <li>Real mileage</li>
                <li>Ownership changes</li>  
                <li>Insurance status</li>
                <li>Potential legal issues</li>
              </ol>
            </strong>
            are often difficult to verify.<br></br> 
            This lack of transparency creates <strong>financial risk, disputes, and mistrust</strong>, hindering a healthy, thriving automotive market.
          </p>
        </section>

        <section className="solution-section">
          <h2 align="center">Our Solution</h2>
          <p>
            <strong>Ethio Drive Track</strong> bridges this information gap by providing <strong>reliable, verified vehicle history reports</strong>. Users can simply enter a VIN or Plate Number to access a comprehensive timeline of a car’s life. 
            By leveraging official traffic and registration data, our platform empowers users to make <strong>informed and confident decisions</strong> when buying or selling vehicles.<br></br>
            Detail the core sections users will find: <br></br>
            • Official Registration Timeline: When and where the car was registered. <br></br>
            • Accident/ Damage ChecksInsurance Status: Data sourced from official traffic records.<br></br>
            • Lien/Loan or Insurance Status: Verification of any outstanding financial obligations. <br></br>
            • Mileage Discrepancy Analysis: Flags any inconsistencies in reported mileage over time.<br></br>
          </p>
        </section>

        <section className="mission-section">
          <h2 align="center">Our Core Commitment</h2>
          <div className="commitment-points">
              <div className="point">
                  <h3>Integrity</h3>
                  <p>We prioritize accuracy and impartiality. Every piece of information is sourced directly from trusted, verifiable official records.</p>
              </div>
              <div className="point">
                  <h3>Local Focus</h3>
                  <p>Our platform is custom-built for Ethiopia, adhering to local regulations, market conditions, and data standards.</p>
              </div>
              <div className="point">
                  <h3>Empowerment</h3>
                  <p>We believe that informed buyers lead to a healthier market. Our goal is to give every user the confidence to make smart vehicle decisions.</p>
              </div>
              <div className="point">
                  <h3>Innovation</h3>
                  <p>We leverage technology and data-driven insights to modernize Ethiopia's automotive market, making vehicle transactions safer, faster, and more transparent.</p>
              </div>
          </div>
        </section>

        <section className="team-section">
          <h2 align="center">Who We Are</h2>
          <p>
            We are a dedicated team of graduates and tech enthusiasts, passionate about building a more transparent and trustworthy automotive market in Ethiopia. 
            By combining local knowledge with innovative solutions, we aim to make vehicle transactions safer, simpler, and more reliable.
          </p>

          <h2 align="center">Our Vision</h2>
          <p>
            We envision a future where every vehicle in Ethiopia has a verified, accessible history. Buyers can make decisions confidently, and sellers can establish credibility—fostering a market built on <strong>trust, knowledge, and accountability</strong>.
          </p>
        </section>

        <section className="contact-cta">
          <h2 align="center">Got Questions?</h2>
          <p>
            Whether you’re buying your first car, selling a used vehicle, or exploring the market, our team is here to guide you with reliable information and support.
          </p>
          <Link to="/contact" className="cta-button">
              Contact Our Team
          </Link>
        </section>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "white",
  },
  overlay: {
    backgroundColor: "rgba(61, 55, 102, 0.6)", 
    minHeight: "100vh",
    padding: "10px",
  },
};

export default About;
