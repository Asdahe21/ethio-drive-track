import React, { useState } from "react";

const Pricing = () => {
  // State to track the selected package (optional for dynamic highlighting/selection)
  const [selectedPackage, setSelectedPackage] = useState(2); // Default to "Most popular" (2 cars)
  // State for the "Show prices for business" toggle

  // Function to simulate package selection
  const handleSelect = (count) => {
    setSelectedPackage(count);
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Pricing</h1>
        <p style={styles.subtitle}>
          Get a report to avoid bad deals, sell faster, or learn if your car is safe.
        </p>
      </div>

      {/* PRICING CARDS CONTAINER */}
      <div style={styles.cardsContainer}>
        
        {/* CARD 1: MOST POPULAR (Check 2 cars) */}
        <div 
          style={selectedPackage === 2 ? styles.cardActive : styles.card}
          onClick={() => handleSelect(2)}
        >
          <div style={styles.mostPopularBadge}>Most popular</div>
          
          <div style={styles.checkboxContainer}>
            <div style={selectedPackage === 2 ? styles.checkboxActive : styles.checkbox}>
              {selectedPackage === 2 && <span style={styles.checkMark}>✔</span>}
            </div>
            <h2 style={styles.cardTitle}>Check 2 cars</h2>
          </div>
          <p style={styles.cardSubtitle}>You can also check motorbikes, trucks, etc.</p>

          <div style={styles.priceGroup}>
            <p style={styles.price}>160 BIRR <span style={styles.perReport}>/ report</span></p>
            <p style={styles.youPayText}>You pay 330 BIRR <s style={styles.originalPrice}>510BIRR</s></p>
            <div style={styles.discountBadge}>-35%</div>
          </div>

          <div style={styles.detailsGroup}>
            <p style={styles.detailsText}>
              <span style={styles.detailsIcon}>&bull;</span> You'll get 2 credits
            </p>
            <p style={styles.detailsLink}>
              <span style={styles.detailsIcon}>&bull;</span> Refund policy
            </p>
          </div>
        </div>

        {/* CARD 2 (Check 3 cars) */}
        <div 
          style={selectedPackage === 3 ? styles.cardActive : styles.card}
          onClick={() => handleSelect(3)}
        >
          <div style={styles.checkboxContainer}>
            <div style={selectedPackage === 3 ? styles.checkboxActive : styles.checkbox}>
              {selectedPackage === 3 && <span style={styles.checkMark}>✔</span>}
            </div>
            <h2 style={styles.cardTitle}>Check 3 cars</h2>
          </div>
          <p style={styles.cardSubtitle}>You can also check motorbikes, trucks, etc.</p>

          <div style={styles.priceGroup}>
            <p style={styles.price}>130 BIRR <span style={styles.perReport}>/ report</span></p>
            <p style={styles.youPayText}>You pay 410 BIRR <s style={styles.originalPrice}>770 BIRR</s></p>
            <div style={styles.discountBadge}>-46%</div>
          </div>
          
          <div style={styles.detailsGroup}>
            <p style={styles.detailsText}>
              <span style={styles.detailsIcon}>&bull;</span> You'll get 3 credits
            </p>
            <p style={styles.detailsLink}>
              <span style={styles.detailsIcon}>&bull;</span> Refund policy
            </p>
          </div>
        </div>
        
        {/* CARD 3 (Check 1 car) */}
        <div 
          style={selectedPackage === 1 ? styles.cardActive : styles.card}
          onClick={() => handleSelect(1)}
        >
          <div style={styles.checkboxContainer}>
            <div style={selectedPackage === 1 ? styles.checkboxActive : styles.checkbox}>
              {selectedPackage === 1 && <span style={styles.checkMark}>✔</span>}
            </div>
            <h2 style={styles.cardTitle}>Check 1 car</h2>
          </div>
          <p style={styles.cardSubtitle}>You can also check motorbikes, trucks, etc.</p>

          <div style={styles.priceGroup}>
            <p style={styles.price}>250 BIRR <span style={styles.perReport}>/ report</span></p>
            <p style={styles.youPayText}>Full price</p>
            <div style={styles.discountBadgeZero}>-0%</div>
          </div>

          <div style={styles.detailsGroup}>
            <p style={styles.detailsText}>
              <span style={styles.detailsIcon}>&bull;</span> You'll get 1 credit
            </p>
            <p style={styles.detailsLink}>
              <span style={styles.detailsIcon}>&bull;</span> Refund policy
            </p>
          </div>
        </div>
        
      </div>

      {/* CONTINUE BUTTON */}
      <button style={styles.continueButton}>Continue</button>
      <p style={styles.vatText}>VAT may apply.</p>
    </div>
  );
};

// --- STYLES (Inline CSS based on the screenshot) ---
const styles = {
  container: {
    minHeight: "100vh",
    padding: "100px 20px 50px 20px",
    background: "linear-gradient(to right, #e2e2e2, #c9d6ff)",
    fontFamily: "'Arial', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
  },
  title: {
    fontSize: "2.5em",
    fontWeight: "700",
    color: "#333",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1em",
    color: "#666",
  },
  
  // TOGGLE STYLES
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '40px',
    color: '#666',
    fontSize: '0.9em',
  },
  toggleLabel: {
    marginRight: '15px',
  },
  toggleSwitch: {
    width: '45px',
    height: '24px',
    backgroundColor: '#00d4d4', // Teal background
    borderRadius: '12px',
    padding: '2px',
    cursor: 'pointer',
    position: 'relative',
    marginRight: '10px',
  },
  toggleSlider: {
    width: '20px',
    height: '20px',
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: 'transform 0.3s',
    transform: 'translateX(0)',
  },
  toggleSliderActive: {
    width: '20px',
    height: '20px',
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: 'transform 0.3s',
    transform: 'translateX(21px)',
  },
  toggleBadge: {
    backgroundColor: '#00d4d4',
    color: 'white',
    fontSize: '0.7em',
    fontWeight: 'bold',
    padding: '3px 6px',
    borderRadius: '4px',
  },

  // CARD CONTAINER STYLES
  cardsContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "40px",
    maxWidth: "1100px",
    width: "100%",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "30px",
    textAlign: "left",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e0e0e0",
    minWidth: '300px',
    position: 'relative',
    cursor: 'pointer',
  },
  cardActive: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "30px",
    textAlign: "left",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    border: "3px solid #007bff", // Blue border for active card
    minWidth: '300px',
    position: 'relative',
    cursor: 'pointer',
  },
  
  // BADGES
  mostPopularBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#007bff', // Blue header
    color: 'white',
    textAlign: 'center',
    padding: '8px 0',
    fontSize: '0.9em',
    fontWeight: 'bold',
    borderTopLeftRadius: '7px',
    borderTopRightRadius: '7px',
    transform: 'translateY(-100%)', // Move above the card
  },

  // CARD CONTENT
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  checkbox: {
    width: '24px',
    height: '24px',
    border: '2px solid #ccc',
    borderRadius: '4px',
    marginRight: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    width: '24px',
    height: '24px',
    backgroundColor: '#007bff', // Blue fill for active
    border: '2px solid #007bff',
    borderRadius: '4px',
    marginRight: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: '1.4em',
    fontWeight: '600',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: '0.85em',
    color: '#999',
    marginBottom: '30px',
    marginLeft: '39px', // Align with title
  },

  // PRICE GROUP
  priceGroup: {
    marginBottom: '30px',
    borderBottom: '1px solid #eee',
    paddingBottom: '20px',
    position: 'relative',
  },
  price: {
    fontSize: '2.4em',
    fontWeight: '700',
    color: '#333',
    margin: '5px 0',
    lineHeight: 1,
  },
  perReport: {
    fontSize: '0.5em',
    fontWeight: '400',
    color: '#666',
  },
  youPayText: {
    fontSize: '0.9em',
    color: '#666',
    margin: '5px 0',
  },
  originalPrice: {
    color: '#ff6666', // Red strike-through
  },
  discountBadge: {
    position: 'absolute',
    bottom: '-12px',
    right: 0,
    backgroundColor: '#ff6666', // Red badge
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '0.9em',
    fontWeight: 'bold',
  },
  discountBadgeZero: { // For the 1-car package
    position: 'absolute',
    bottom: '-12px',
    right: 0,
    backgroundColor: '#ccc',
    color: '#333',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '0.9em',
    fontWeight: 'bold',
  },

  // DETAILS GROUP
  detailsGroup: {
    fontSize: '0.9em',
  },
  detailsText: {
    color: '#666',
    margin: '10px 0',
  },
  detailsLink: {
    color: '#666',
    textDecoration: 'none',
    margin: '10px 0',
  },
  detailsIcon: {
    color: '#007bff',
    marginRight: '5px',
    fontSize: '1.2em',
    lineHeight: 0,
  },

  // BUTTON AND VAT TEXT
  continueButton: {
    padding: "15px 50px",
    backgroundColor: "#ffdd44", // Bright yellow
    color: "#333",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.1em",
    fontWeight: "bold",
    transition: "background-color 0.2s",
    width: '300px', // Fixed width like the screenshot
  },
  vatText: {
    marginTop: '10px',
    fontSize: '0.8em',
    color: '#999',
  }
};

export default Pricing;